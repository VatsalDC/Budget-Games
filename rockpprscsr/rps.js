function rock(){
    const randomNum = Math.random();
    let  computerMove='';
    let result='';
    if(randomNum >= 0 && randomNum < 1/3){
      computerMove='Rock';
    }
    else if(randomNum >= 1/3 && randomNum < 2/3){
      computerMove='Paper';
    }
    else if(randomNum >= 2/3 && randomNum < 1){
      computerMove='Scissors';
    }
    console.log(computerMove);

    if(computerMove === 'Rock'){
      result='Tie';
    }
    else if(computerMove === 'Paper'){
      result='You Lose';
    }
    else if(computerMove === 'Scissors'){
      result='You Win';
    }
    alert(`You:  Rock   |   Computer:  ${computerMove}   Result = ${result}`)
}


function paper(){
    const randomNum = Math.random();
    let computerMove='';
    let result='';
    if(randomNum >= 0 && randomNum < 1/3){
      computerMove='Rock';
    }
    else if(randomNum >= 1/3 && randomNum < 2/3){
      computerMove='Paper';
    }
    else if(randomNum >= 2/3 && randomNum < 1){
      computerMove='Scissors';
    }
    console.log(computerMove);
    
    if(computerMove === 'Rock'){
      result='You Win';
    }
    else if(computerMove === 'Paper'){
      result='Tie';
    }
    else if(computerMove === 'Scissors'){
      result='You Lose';
    }
    alert(`You:  Paper   |   Computer:  ${computerMove}   Result = ${result}`)
}   


function scissors(){
    const randomNum = Math.random();
    let  computerMove='';
    let result='';
    if(randomNum >= 0 && randomNum < 1/3){
      computerMove='Rock';
    }
    else if(randomNum >= 1/3 && randomNum < 2/3){
      computerMove='Paper';
    }
    else if(randomNum >= 2/3 && randomNum < 1){
      computerMove='Scissors';
    }
    console.log(computerMove);

    if(computerMove === 'Rock'){
      result='You Lose';
    }
    else if(computerMove === 'Paper'){
      result='You Win';
    }
    else if(computerMove === 'Scissors'){
      result='Tie';
    }
    alert(`You:  Scissors   |   Computer:  ${computerMove}   Result = ${result}`)
}