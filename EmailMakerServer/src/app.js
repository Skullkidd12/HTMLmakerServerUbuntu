const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const nunjucks = require("nunjucks");
const path = require("path");
const templatesDir = path.join(__dirname, "views");
const cron = require('node-cron');
app.use(cors());
app.use(express.text());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req,res,next)=>{
   console.log(`${req.method}:${req.url}`);
   next();
})
nunjucks.configure(templatesDir, {
    autoescape: true,
    express: app,
    watch: true,
});

cron.schedule('*/8 * * * *', async function() {
    fetch('https://emailmaker-server-ohio.onrender.com/wake',)
    .catch(err =>{console.log(err)});
 });

app.get("/wake",(req,res)=>{
   console.log('recebido wake')
   res.sendStatus(200)
})

//escreve o arquivo template njk baseado nos inputs do forms
app.post("/MakeHTML", (req, res) => {
    const content = req.body.componente;
    let lineColor = '#EFEFEF';
    if(content.includes('')){
      console.log('array invalido');
      res.send('');
    } 
    switch (content[0]) {
    case 'coop_headerSuper':
      lineColor = '#FA6e50'
      break;
    case 'coop_headerSuperSite':
      lineColor = '#FA6e50'
      break;
    case 'coop_headerDroga':
      lineColor = '#3cc86e'
      break;
    case 'coop_headerDrogaSite':
      lineColor = '#3cc86e'
      break;
    case 'coop_headerAtacarejo':
      lineColor = '#C83C46'
      break;
    case 'coop_headerInstitucional':
      lineColor = '#C83C46'
      break;
    case 'coop_headerEmporio':
      lineColor = '#ADA08A'
      break;
    default:
      lineColor = '#EFEFEF'
      break
    }

    //aqui eu escrevo a primeira parte do HTML, e pego o input do HEX da cor do background
    const escreveHTMLbody1 = () => {
        let bgcolor = "";
        if (req.body.background) {
            bgcolor = req.body.background;
        } else{
            bgcolor = "#002747";
        }

        if(content[0]=='zonasul_header') {
         bgcolor="#ffffff"
         fs.writeFileSync(
            path.join(__dirname, "views", "template.njk"),
            `<!doctype html>\n<html>\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1">\n<meta name="HTMLMaker_v1.1.1" content="plusoft-tpl">\n<title>Zona Sul</title>\n<style>\nbody{margin:0; padding:0}\nimg{margin:0; padding:0; }\na[href^=tel]{ color:#666666; text-decoration:none;}\na[href^=date]{ color:#666666; text-decoration:none;}\nhr {margin:0 !important}\ndiv, p, a, li, td {-webkit-text-size-adjust:none;}\n\n</style>\n</head>\n<body>\n<div style="font-size:0px;line-height:1px;mso-line-height-rule:exactly;display:none;max-width:0px;max-height:0px;opacity:0;overflow:hidden;mso-hide:all;">\nINSERIR PREHEADER AQUI\n</div>\n<div style="margin:0; padding:0;" bgcolor="#ffffff">\n\n\n<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="table-layout: fixed" bgcolor="#F4F4F4"><tr><td align="center" valign="top">\n\n<!--[if mso]><table width="680" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td align="center" valign="top"><![endif]-->\n<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="max-width:680px" bgcolor="${bgcolor}">\n`);
         }else{
         fs.writeFileSync(
            path.join(__dirname, "views", "template.njk"),
            `<!doctype html>\n<html>\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1">\n<meta name="HTMLMaker_v1.1.1" content="plusoft-tpl">\n<title>HTML</title>\n<style>\nbody{margin:0; padding:0}\nimg{margin:0; padding:0; }\na[href^=tel]{ color:#666666; text-decoration:none;}\na[href^=date]{ color:#666666; text-decoration:none;}\nhr {margin:0 !important}\ndiv, p, a, li, td {-webkit-text-size-adjust:none;}\n\n</style>\n</head>\n<body>\n<div style="margin:0; padding:0;" bgcolor="#EFEFEF">\n<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="table-layout: fixed; border-top: 9px solid ${lineColor}; border-bottom: 9px solid ${lineColor}" bgcolor="#EFEFEF"><tr><td align="center" valign="top">\n<!--[if mso]><table width="680" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td align="center" valign="top"><![endif]-->\n<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="max-width:680px" bgcolor="${bgcolor}">\n`);
        };

        }
 
    //aqui eu pego o nome dos componentes e coloco no corpo do arquivo template.njk 
    const escreveContent = () => {
        for (let i = 0; i < content.length; i++) {
            const element = content[i];
            fs.appendFileSync(
                path.join(__dirname, "views", "template.njk"),
                `\n{% include "./${element}.njk" %}`
            );
        }
    };

    //aqui eu escrevo a ultima parte do html lá no arquivo template.njk
    const criaTemplate = () => {
        escreveHTMLbody1();
        escreveContent();
        fs.appendFileSync(
            path.join(__dirname, "views", "template.njk"),
            `</table>\n<!--[if mso]></td></tr></table><![endif]-->\n</td></tr></table>\n</div>\n</body>\n</html>`
        );
    };
    
    //checa a utm
   const checkUTM = () => {
      let inputUTM = "";
      if (req.body.UTM){
         console.log('utm encontrados');
         inputUTM = req.body.UTM;
         try {
            const data = fs.readFileSync(path.join(__dirname, "output.html"), 'utf8');
            let correcaoUTM = data.replace(/<#UTM_NOMECAMPANHA>/g, inputUTM);
            const resultado = correcaoUTM;
            return resultado
          } catch (err) {
            console.error(err);
            return 0
          }
      }else{
         return 0     
      }
   };
   const corrigeUTM = () => {
      let htmlUTMcorrigido = checkUTM();
      if(htmlUTMcorrigido){
        fs.writeFileSync(path.join(__dirname, "output.html"), htmlUTMcorrigido);
      }else if(htmlUTMcorrigido==0){
        console.log('sem input de utm') 
      };
   };

   //checa o MMKT
   const checkMMKT = () => {
      let inputMMKT = "";
      if (req.body.MMKT){
         inputMMKT = req.body.MMKT;
         try {
            const data = fs.readFileSync(path.join(__dirname, "output.html"), 'utf8');
            let correcaoMMKT = data.replace(/(https:\/\/imgs\.effectivecampaign\.com\.br)(\/coop\/htmlmaker\/)/g, inputMMKT);
            correcaoMMKT = correcaoMMKT.replace(/(https:\/\/imgs\.effectivecampaign\.com\.br)(\/zonasul\/htmlmaker\/)/g, inputMMKT);
            const resultado = correcaoMMKT;
            return resultado
          } catch (err) {
            console.error(err);
            return 0
          }
      }else{
         return 0     
      }
   };
   const corrigeMMKT = () => {
      let htmlMMKTcorrigido = checkMMKT();
      if(htmlMMKTcorrigido){
      fs.writeFileSync(path.join(__dirname, "output.html"), htmlMMKTcorrigido);
      }else if(htmlMMKTcorrigido==0){
      console.log('sem input de MMKT') 
      };
   };

   criaTemplate();
   console.log('terminou de escrever .njk');



    var html = nunjucks.render("template.njk");
    fs.writeFileSync(path.join(__dirname, "output.html"), html);
    corrigeUTM();
    corrigeMMKT();
    console.log('renderizou html');
    res.download(
        path.join(__dirname, "output.html"),
        "template.html",
        (err) => {
            if (err) {
                console.log(err);
            } else {
                fs.unlinkSync(path.join(__dirname, "output.html"));
            }
        }
    );
    console.log('disponibilizou download');
});

//escreve o arquivo template njk baseado nos inputs do forms e joga pro preview
app.post("/MakePreview", (req, res) => {
   const content = req.body.componente;
    let lineColor = '#EFEFEF';
    if(content.includes('')){
      console.log('array invalido');
      res.send('');
    } 
    switch (content[0]) {
    case 'coop_headerSuper':
      lineColor = '#FA6e50'
      break;
    case 'coop_headerSuperSite':
      lineColor = '#FA6e50'
      break;
    case 'coop_headerDroga':
      lineColor = '#3cc86e'
      break;
    case 'coop_headerDrogaSite':
      lineColor = '#3cc86e'
      break;
    case 'coop_headerAtacarejo':
      lineColor = '#C83C46'
      break;
    case 'coop_headerInstitucional':
      lineColor = '#C83C46'
      break;
    case 'coop_headerEmporio':
      lineColor = '#ADA08A'
      break;
    default:
      lineColor = '#EFEFEF'
      break
    }

    //aqui eu escrevo a primeira parte do HTML, e pego o input do HEX da cor do background
    const escreveHTMLbody1 = () => {
        let bgcolor = "";
        if (req.body.background) {
            bgcolor = req.body.background;
        } else{
            bgcolor = "#002747";
        }

        if(content[0]=='zonasul_header') {
         bgcolor="#ffffff"
         fs.writeFileSync(
            path.join(__dirname, "views", "template.njk"),
            `<!doctype html>\n<html>\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1">\n<meta name="HTMLMaker_v1.1" content="plusoft-tpl">\n<title>Zona Sul</title>\n<style>\nbody{margin:0; padding:0}\nimg{margin:0; padding:0; }\na[href^=tel]{ color:#666666; text-decoration:none;}\na[href^=date]{ color:#666666; text-decoration:none;}\nhr {margin:0 !important}\ndiv, p, a, li, td {-webkit-text-size-adjust:none;}\n\n</style>\n</head>\n<body>\n<div style="font-size:0px;line-height:1px;mso-line-height-rule:exactly;display:none;max-width:0px;max-height:0px;opacity:0;overflow:hidden;mso-hide:all;">\nINSERIR PREHEADER AQUI\n</div>\n<div style="margin:0; padding:0;" bgcolor="#ffffff">\n\n\n<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="table-layout: fixed" bgcolor="#F4F4F4"><tr><td align="center" valign="top">\n\n<!--[if mso]><table width="680" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td align="center" valign="top"><![endif]-->\n<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="max-width:680px" bgcolor="${bgcolor}">\n`);
         }else{
         fs.writeFileSync(
            path.join(__dirname, "views", "template.njk"),
            `<!doctype html>\n<html>\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1">\n<meta name="HTMLMaker_v1.1" content="plusoft-tpl">\n<title>HTML</title>\n<style>\nbody{margin:0; padding:0}\nimg{margin:0; padding:0; }\na[href^=tel]{ color:#666666; text-decoration:none;}\na[href^=date]{ color:#666666; text-decoration:none;}\nhr {margin:0 !important}\ndiv, p, a, li, td {-webkit-text-size-adjust:none;}\n\n</style>\n</head>\n<body>\n<div style="margin:0; padding:0;" bgcolor="#EFEFEF">\n<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="table-layout: fixed; border-top: 9px solid ${lineColor}; border-bottom: 9px solid ${lineColor}" bgcolor="#EFEFEF"><tr><td align="center" valign="top">\n<!--[if mso]><table width="680" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td align="center" valign="top"><![endif]-->\n<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="max-width:680px" bgcolor="${bgcolor}">\n`);
        };

        }
 
    //aqui eu pego o nome dos componentes e coloco no corpo do arquivo template.njk 
    const escreveContent = () => {
        for (let i = 0; i < content.length; i++) {
            const element = content[i];
            fs.appendFileSync(
                path.join(__dirname, "views", "template.njk"),
                `\n{% include "./${element}.njk" %}`
            );
        }
    };

    //aqui eu escrevo a ultima parte do html lá no arquivo template.njk
    const criaTemplate = () => {
        escreveHTMLbody1();
        escreveContent();
        fs.appendFileSync(
            path.join(__dirname, "views", "template.njk"),
            `</table>\n<!--[if mso]></td></tr></table><![endif]-->\n</td></tr></table>\n</div>\n</body>\n</html>`
        );
    };
    
    //checa a utm
   const checkUTM = () => {
      let inputUTM = "";
      if (req.body.UTM){
         console.log('utm encontrados');
         inputUTM = req.body.UTM;
         try {
            const data = fs.readFileSync(path.join(__dirname, "output.html"), 'utf8');
            let correcaoUTM = data.replace(/<#UTM_NOMECAMPANHA>/g, inputUTM);
            const resultado = correcaoUTM;
            return resultado
          } catch (err) {
            console.error(err);
            return 0
          }
      }else{
         return 0     
      }
   };
   const corrigeUTM = () => {
      let htmlUTMcorrigido = checkUTM();
      if(htmlUTMcorrigido){
        fs.writeFileSync(path.join(__dirname, "output.html"), htmlUTMcorrigido);
      }else if(htmlUTMcorrigido==0){
        console.log('sem input de utm') 
      };
   };

   //checa o MMKT
   const checkMMKT = () => {
      let inputMMKT = "";
      if (req.body.MMKT){
         inputMMKT = req.body.MMKT;
         try {
            const data = fs.readFileSync(path.join(__dirname, "output.html"), 'utf8');
            let correcaoMMKT = data.replace(/(https:\/\/imgs\.effectivecampaign\.com\.br)(\/coop\/htmlmaker\/)/g, inputMMKT);
            correcaoMMKT = correcaoMMKT.replace(/(https:\/\/imgs\.effectivecampaign\.com\.br)(\/zonasul\/htmlmaker\/)/g, inputMMKT);
            const resultado = correcaoMMKT;
            return resultado
          } catch (err) {
            console.error(err);
            return 0
          }
      }else{
         return 0     
      }
   };
   const corrigeMMKT = () => {
      let htmlMMKTcorrigido = checkMMKT();
      if(htmlMMKTcorrigido){
      fs.writeFileSync(path.join(__dirname, "output.html"), htmlMMKTcorrigido);
      }else if(htmlMMKTcorrigido==0){
      console.log('sem input de MMKT') 
      };
   };

   criaTemplate();
   console.log('terminou de escrever .njk');

  var html = nunjucks.render("template.njk");
   fs.writeFileSync(path.join(__dirname, "output.html"), html);
   corrigeUTM();
   corrigeMMKT();
   console.log('renderizou html e liberou preview');
   res.sendFile(
       path.join(__dirname, "output.html"),
       "template.html",
       (err) => {
           if (err) {
               console.log(err);
           } else {
               fs.unlinkSync(path.join(__dirname, "output.html"));
           }
       }
   );

});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

