import fs from 'fs'

export default function EscribirError(error){
const content = String(error);


fs.appendFile('./errores/error.txt', "   " + content + " \n", err => {
  if (err) {
    console.error(err);
  }
  // file written successfully
});

}