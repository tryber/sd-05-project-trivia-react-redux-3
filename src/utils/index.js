


const unique = (text) => (
  `${text}-Math.round(Math.random() * 1E9)`
);

export const formatText = (text) => (
  text
    .replace(/&#039;/gi, '')
    .replace(/&quot;/gi, '`')
    .replace(/&aacute;/gi, 'á')
    .replace(/&eacute;/gi, 'é')
    .replace(/&iacute;/gi, 'í')
    .replace(/&oacute;/gi, 'ó')
    .replace(/&uacute;/gi, 'ú')
    
)

export default unique;
