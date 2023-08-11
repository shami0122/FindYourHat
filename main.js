const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field){
    this.field = field;
  }
  
  print(){
      for(let i = 0; i < this.field.length; i++){
         console.log(this.field[i].join('').toString());
      }
  }

  isValid(row, col) {
    return (
      row >= 0 &&
      row < this.field.length &&
      col >= 0 &&
      col < this.field[0].length
    );
  }

  playGame(){
      let flag = false;
      let i = 0;
      let j = 0;
      while(flag === false){
        let userInput = prompt('Which way?');
        if(userInput === 'down'){
          if (!this.isValid(i + 1, j)) {
              console.error('You went out of bounds! Game Over!');
              break;
          }
          else if(this.field[i + 1][j] !== hole && this.field[i + 1][j] !== hat){
             this.field[i + 1][j] = pathCharacter;
          }  
          else{
            flag = true;
          }   
          i++; 
        }
        else if(userInput === 'up'){
           if (!this.isValid(i - 1, j)) {
              console.error('You went out of bounds! Game Over!');
              break;
          }
          else if(this.field[i - 1][j] !== hole && this.field[i - 1][j] !== hat){
            this.field[i - 1][j] = pathCharacter;
          }  
          else{
            flag = true;
          }     
          i--;    
        }
        else if(userInput === 'left'){
           if (!this.isValid(i, j - 1)) {
              console.error('You went out of bounds! Game Over!');
              break;
          }
          else if(this.field[i][j - 1] !== hole && this.field[i][j - 1] !== hat){
            this.field[i][j - 1] = pathCharacter;
          }  
          else{
            flag = true;
          }  
          j--; 
        }
        else if(userInput === 'right'){
           if (!this.isValid(i, j + 1)) {
              console.error('You went out of bounds! Game Over!');
              break;
          }
           if(this.field[i][j + 1] !== hole && this.field[i][j + 1] !== hat){
            this.field[i][j + 1] = pathCharacter;
          }  
          else{
            flag = true;
          }  
          j++;      
        }
        this.print();
    }
    if(this.field[i][j] === hat){
      console.log('Congrats you win!');
    }
    else if(this.field[i][j] === hole){
      console.log('Oh no! you fell in a hole! Game Over');
    }
  }   

  static generateField(rows, columns){
    var newField = Array.from(Array(rows), () => new Array(columns));

    for (let i = 0; i < newField.length; i++) {
      for (let j = 0; j < newField[0].length; j++) {
        newField[i][j] = fieldCharacter; 
      }
    }

    let firsVal = 0;
    let secondVal = 0;

    for (let i = 0; i < rows; i++) {
        firsVal = Math.floor(Math.random() * rows);
        secondVal = Math.floor(Math.random() * columns);

        if(newField[firsVal][secondVal] === fieldCharacter){
          if(firsVal === 0){
            if(secondVal === 0){
              i--;
              continue;
            }
          }
          newField[firsVal][secondVal] = hole;
        }
        else{
          i--;
        }
    }

    let i = 0;
    while( i < 1){
      firsVal = Math.floor(Math.random() * rows);
      secondVal = Math.floor(Math.random() * columns);
      if(newField[firsVal][secondVal] === fieldCharacter){
        if(firsVal === 0){
          if(secondVal === 0){
            continue;
          }
        }
        i++;
        newField[firsVal][secondVal] = hat;
      }
    } 

    return newField;
  }
} 

const myField = new Field(Field.generateField(2, 3));
myField.print();




  