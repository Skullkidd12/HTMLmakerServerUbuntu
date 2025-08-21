const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const nunjucks = require("nunjucks");
const path = require("path");
const templatesDir = path.join(__dirname, "views");
const cron = require('node-cron');
const {CabecalhoCOOP,CabecalhoZS,CabecalhoFPM,CabecalhoEXF} = require('./cabecalho.js');
const {corrigeMMKT,corrigeUTM,corrigeBG} = require('./utilities.js');
const {encerramentoPadrao,encerramentoFPM,encerramentoEXF} = require('./encerramento.js');
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
    fetch('http://localhost:3000/wake',)
    .catch(err =>{console.log(err)});
 });
app.get("/wake",(req,res)=>{
   res.sendStatus(200)
})





//escreve o arquivo template njk baseado nos inputs do forms
app.post("/MakeHTML", (req, res) => {
   const content = req.body.componente;
   if(content.includes('')){
   console.log('array invalido');
   res.send('');
   } ;
    
    //aqui eu escrevo a primeira parte do HTML
   const escreveHTMLbody1 = () => {
   let lineColor = '#EFEFEF';
   switch (content[0]) {
      case 'coop_headerSuper':
         lineColor = '#FA6e50'
         fs.writeFileSync(
               path.join(__dirname, "views", "template.njk"),
               CabecalhoCOOP(lineColor))
      break;
      case 'coop_headerSuperSite':
         lineColor = '#FA6e50';
         fs.writeFileSync(
               path.join(__dirname, "views", "template.njk"),
               CabecalhoCOOP(lineColor))
      break;
      case 'coop_headerDroga':
         lineColor = '#3cc86e'
         fs.writeFileSync(
               path.join(__dirname, "views", "template.njk"),
               CabecalhoCOOP(lineColor))
      break;
      case 'coop_headerDrogaSite':
         lineColor = '#3cc86e'
         fs.writeFileSync(
               path.join(__dirname, "views", "template.njk"),
               CabecalhoCOOP(lineColor))
      break;
      case 'coop_headerAtacarejo':
         lineColor = '#C83C46'
         fs.writeFileSync(
               path.join(__dirname, "views", "template.njk"),
               CabecalhoCOOP(lineColor))
      break;
      case 'coop_headerInstitucional':
         lineColor = '#C83C46'
         fs.writeFileSync(
               path.join(__dirname, "views", "template.njk"),
               CabecalhoCOOP(lineColor))
      break;
      case 'coop_headerEmporio':
      lineColor = '#ADA08A'
      fs.writeFileSync(
            path.join(__dirname, "views", "template.njk"),
            CabecalhoCOOP(lineColor))
      break;
      case 'zonasul_header':
         fs.writeFileSync(
            path.join(__dirname, "views", "template.njk"),
            CabecalhoZS())
      break;
      case 'FPM_header':
         fs.writeFileSync(
            path.join(__dirname, "views", "template.njk"),
            CabecalhoFPM())
      break;
      case 'EXF_header':
         fs.writeFileSync(
            path.join(__dirname, "views", "template.njk"),
            CabecalhoEXF())
      break;
      default:
      lineColor = '#EFEFEF'
         fs.writeFileSync(
            path.join(__dirname, "views", "template.njk"),
            CabecalhoCOOP(lineColor))
      break;
      }

   };
 
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

   const escreveEncerramento = () =>{
   switch (content[0]) {
      case 'coop_headerSuper':
      fs.appendFileSync(
            path.join(__dirname, "views", "template.njk"),
            encerramentoPadrao()
      ) 
      break;
      case 'coop_headerSuperSite':
         fs.appendFileSync(
            path.join(__dirname, "views", "template.njk"),
            encerramentoPadrao()
      )
      break;
      case 'coop_headerDroga':
      fs.appendFileSync(
            path.join(__dirname, "views", "template.njk"),
            encerramentoPadrao()
      )
      break;
      case 'coop_headerDrogaSite':
         fs.appendFileSync(
            path.join(__dirname, "views", "template.njk"),
            encerramentoPadrao()
      )
      break;
      case 'coop_headerAtacarejo':
         fs.appendFileSync(
            path.join(__dirname, "views", "template.njk"),
            encerramentoPadrao()
      )
      break;
      case 'coop_headerInstitucional':
      fs.appendFileSync(
            path.join(__dirname, "views", "template.njk"),
            encerramentoPadrao()
      )
      break;
      case 'coop_headerEmporio':
         fs.appendFileSync(
               path.join(__dirname, "views", "template.njk"),
               encerramentoPadrao()
         )
      break;
      case 'zonasul_header':
         fs.appendFileSync(
            path.join(__dirname, "views", "template.njk"),
            encerramentoPadrao()
         )
      break;
      case 'FPM_header':
         fs.appendFileSync(
            path.join(__dirname, "views", "template.njk"),
            encerramentoFPM()
         )
      break;
      case 'EXF_header':
         fs.appendFileSync(
            path.join(__dirname, "views", "template.njk"),
            encerramentoEXF()
      )
      break;
      default:
         fs.appendFileSync(
            path.join(__dirname, "views", "template.njk"),
            encerramentoFPM()
         )
      break;
      } 
   };

    //aqui eu escrevo a ultima parte do html lá no arquivo template.njk
   const criaTemplate = () => {
      escreveHTMLbody1();
      escreveContent();
      escreveEncerramento();
      /*fs.appendFileSync(
         path.join(__dirname, "views", "template.njk"),
         encerramentoPadrao()
      );*/
   };
    
   criaTemplate();
   console.log('terminou de escrever .njk');



   var html = nunjucks.render("template.njk");
   fs.writeFileSync(path.join(__dirname, "output.html"), html);
   corrigeUTM(req);
   corrigeMMKT(req);
   corrigeBG(req);
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
   if(content.includes('')){
   console.log('array invalido');
   res.send('');
   } ;
    
    //aqui eu escrevo a primeira parte do HTML
   const escreveHTMLbody1 = () => {
   let lineColor = '#EFEFEF';
   switch (content[0]) {
      case 'coop_headerSuper':
         lineColor = '#FA6e50'
         fs.writeFileSync(
               path.join(__dirname, "views", "template.njk"),
               CabecalhoCOOP(lineColor))
      break;
      case 'coop_headerSuperSite':
         lineColor = '#FA6e50';
         fs.writeFileSync(
               path.join(__dirname, "views", "template.njk"),
               CabecalhoCOOP(lineColor))
      break;
      case 'coop_headerDroga':
         lineColor = '#3cc86e'
         fs.writeFileSync(
               path.join(__dirname, "views", "template.njk"),
               CabecalhoCOOP(lineColor))
      break;
      case 'coop_headerDrogaSite':
         lineColor = '#3cc86e'
         fs.writeFileSync(
               path.join(__dirname, "views", "template.njk"),
               CabecalhoCOOP(lineColor))
      break;
      case 'coop_headerAtacarejo':
         lineColor = '#C83C46'
         fs.writeFileSync(
               path.join(__dirname, "views", "template.njk"),
               CabecalhoCOOP(lineColor))
      break;
      case 'coop_headerInstitucional':
         lineColor = '#C83C46'
         fs.writeFileSync(
               path.join(__dirname, "views", "template.njk"),
               CabecalhoCOOP(lineColor))
      break;
      case 'coop_headerEmporio':
      lineColor = '#ADA08A'
      fs.writeFileSync(
            path.join(__dirname, "views", "template.njk"),
            CabecalhoCOOP(lineColor))
      break;
      case 'zonasul_header':
         fs.writeFileSync(
            path.join(__dirname, "views", "template.njk"),
            CabecalhoZS())
      break;
      case 'FPM_header':
         fs.writeFileSync(
            path.join(__dirname, "views", "template.njk"),
            CabecalhoFPM())
      break;
      case 'EXF_header':
         fs.writeFileSync(
            path.join(__dirname, "views", "template.njk"),
            CabecalhoEXF())
      break;
      default:
      lineColor = '#EFEFEF'
         fs.writeFileSync(
            path.join(__dirname, "views", "template.njk"),
            CabecalhoCOOP(lineColor))
      break;
      }

   };
 
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

   const escreveEncerramento = () =>{
   switch (content[0]) {
      case 'coop_headerSuper':
      fs.appendFileSync(
            path.join(__dirname, "views", "template.njk"),
            encerramentoPadrao()
      ) 
      break;
      case 'coop_headerSuperSite':
         fs.appendFileSync(
            path.join(__dirname, "views", "template.njk"),
            encerramentoPadrao()
      )
      break;
      case 'coop_headerDroga':
      fs.appendFileSync(
            path.join(__dirname, "views", "template.njk"),
            encerramentoPadrao()
      )
      break;
      case 'coop_headerDrogaSite':
         fs.appendFileSync(
            path.join(__dirname, "views", "template.njk"),
            encerramentoPadrao()
      )
      break;
      case 'coop_headerAtacarejo':
         fs.appendFileSync(
            path.join(__dirname, "views", "template.njk"),
            encerramentoPadrao()
      )
      break;
      case 'coop_headerInstitucional':
      fs.appendFileSync(
            path.join(__dirname, "views", "template.njk"),
            encerramentoPadrao()
      )
      break;
      case 'coop_headerEmporio':
         fs.appendFileSync(
               path.join(__dirname, "views", "template.njk"),
               encerramentoPadrao()
         )
      break;
      case 'zonasul_header':
         fs.appendFileSync(
            path.join(__dirname, "views", "template.njk"),
            encerramentoPadrao()
         )
      break;
      case 'FPM_header':
         fs.appendFileSync(
            path.join(__dirname, "views", "template.njk"),
            encerramentoFPM()
         )
      break;
      case 'EXF_header':
         fs.appendFileSync(
            path.join(__dirname, "views", "template.njk"),
            encerramentoEXF()
      )
      break;
      default:
         fs.appendFileSync(
            path.join(__dirname, "views", "template.njk"),
            encerramentoFPM()
         )
      break;
      } 
   };

    //aqui eu escrevo a ultima parte do html lá no arquivo template.njk
   const criaTemplate = () => {
      escreveHTMLbody1();
      escreveContent();
      escreveEncerramento();
      /*fs.appendFileSync(
         path.join(__dirname, "views", "template.njk"),
         encerramentoPadrao()
      );*/
   };
    
   criaTemplate();
   console.log('terminou de escrever .njk');



   var html = nunjucks.render("template.njk");
   fs.writeFileSync(path.join(__dirname, "output.html"), html);
   corrigeUTM(req);
   corrigeMMKT(req);
   corrigeBG(req);
   console.log('renderizou html');



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

