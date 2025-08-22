const fs = require("fs");
const path = require("path");

//checa e corrige MMKT
const checkMMKT = (req) => {
      let inputMMKT = "";
      if (req.body.MMKT){
         console.log('URL de img encontrado');
         inputMMKT = req.body.MMKT;
         try {
            const data = fs.readFileSync(path.join(__dirname, "output.html"), 'utf8');
            let correcaoMMKT = data.replace(/(https:\/\/imgs\.effectivecampaign\.com\.br)(\/coop\/htmlmaker\/)/g, inputMMKT);
            correcaoMMKT = correcaoMMKT.replace(/(https:\/\/imgs\.effectivecampaign\.com\.br)(\/zonasul\/htmlmaker\/)/g, inputMMKT);
            correcaoMMKT = correcaoMMKT.replace(/https:\/\/imgs\.plusoftdtm\.com\/fpm\/htmlmaker\/FPM_/g, inputMMKT);
            correcaoMMKT = correcaoMMKT.replace(/https:\/\/imgs\.plusoftdtm\.com\/fpm\/htmlmaker\/EXF_/g, inputMMKT);
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
const corrigeMMKT = (req) => {
   let htmlMMKTcorrigido = checkMMKT(req);
   if(htmlMMKTcorrigido){
   fs.writeFileSync(path.join(__dirname, "output.html"), htmlMMKTcorrigido);
   }else if(htmlMMKTcorrigido==0){
   console.log('sem input de MMKT') 
   };
};

//checa a corrige UTM
const checkUTM = (req) => {
   let inputUTM = "";
   if (req.body.UTM){
      console.log('utm encontrados');
      inputUTM = req.body.UTM;
      try {
         const data = fs.readFileSync(path.join(__dirname, "output.html"), 'utf8');
         let correcaoUTM = data.replace(/<#UTM_NOMECAMPANHA>/g, inputUTM);
         correcaoUTM = correcaoUTM.replace(/<#PARAMETRIZACAO>/g, inputUTM);
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
const corrigeUTM = (req) => {
   let htmlUTMcorrigido = checkUTM(req);
   if(htmlUTMcorrigido){
      fs.writeFileSync(path.join(__dirname, "output.html"), htmlUTMcorrigido);
   }else if(htmlUTMcorrigido==0){
      console.log('sem input de utm') 
   };
};

//checa a corrige bgcolor
const checkBG = (req) => {
   let inputBG = "";
   let tableBgVelhoCOOP = '<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="max-width:680px" bgcolor="#002747">'
   let tableBgVelhoZS = '<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="max-width:680px" bgcolor="#ffffff">'
   let tableBgVelhoFPM = '<td align="center" class="wrap" valign="top" bgcolor="#0000BE" style="font-size: 0; line-height:0; padding: 0px 0px 20px 0px; border-radius: 20px 20px 20px 20px;">'
   let tableBgVelhoEXF = '<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="max-width:680px" bgcolor="#662E8D">'
   if (req.body.background){
      console.log('bg encontrado');
      inputBG = req.body.background;
      let tableBgNovo = `<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="max-width:680px" bgcolor="${inputBG}">`
      let tableBgNovoFPM = `<td align="center" class="wrap" valign="top" bgcolor="${inputBG}" style="font-size: 0; line-height:0; padding: 0px 0px 20px 0px; border-radius: 20px 20px 20px 20px;">`
      try {
         const data = fs.readFileSync(path.join(__dirname, "output.html"), 'utf8');
         let correcaoBG = data.replace(tableBgVelhoCOOP, tableBgNovo);
         correcaoBG = correcaoBG.replace(tableBgVelhoZS, tableBgNovo);
         correcaoBG = correcaoBG.replace(tableBgVelhoFPM, tableBgNovoFPM);
         correcaoBG = correcaoBG.replace(tableBgVelhoEXF, tableBgNovo);
         const resultado = correcaoBG;
         console.log('teminou a funcao de correcao')
         return resultado
         } catch (err) {
         console.error(err);
         return 0
         }
   }else{
      return 0     
   }
};
const corrigeBG = (req) => {
   let htmlBGcorrigido = checkBG(req);
   if(htmlBGcorrigido){
      fs.writeFileSync(path.join(__dirname, "output.html"), htmlBGcorrigido);
   }else if(htmlBGcorrigido==0){
      console.log('sem input de BG') 
   };
};


module.exports = {corrigeMMKT,corrigeUTM,corrigeBG}   