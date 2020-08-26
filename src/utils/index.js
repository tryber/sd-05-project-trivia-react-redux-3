


const unique = (text) => (
  `${text}-Math.round(Math.random() * 1E9)`
);

export const formatText = (text) => (
  text
    .replace('&quot;', '')
    .replace('&#039;', '`')
    .replace('&eacute;', 'e')
)

export default unique;
