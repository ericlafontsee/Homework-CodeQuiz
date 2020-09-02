# Code Quiz
## Description
For our homework assignment, we were asked to create a timed code quiz.   
This project focuses on utilizing local storage and state management.  
When the user clicks start they will be asked a series of 10 questions.  
The quiz is timed at 60 seconds. The user will be rewarded a point for   
every correct answer and penalized 10 seconds for every incorrect answer.  
If the user successfully completes the quiz, they will be asked to enter     
their initials into a form. When the user clicks save, their score will   
populate in the list next to other high scores from local storage.

This app is mobile responsive and is deployed to GitHub Pages. Try it out!
https://ericlafontsee.github.io/Homework-CodeQuiz/

## Instructions
* Click start 
* When presented with the question, click the button of the correct answer.
* Every incorrect answer will result in a penalty of 10 seconds removed from the count down timer. 
* If you successfully answer all 10 questions, you will be asked to enter your initials in the High Score List. 
* Enter your initials in the text area, then click save or press enter.
* Your score, along with your initials, will be displayed in a list of other high scores.
* If you unsuccessfully answer all the questions before the timer runs out, you lose and must click the try again button.


## Usage
![Code-Quiz Demo](images/Code-Quiz-Demo.gif)


## Built With
HTML  
CSS  
JavaScript   
BootStrap   
Background image from toptal.com

## Prerequisites
To build or edit this application you will need Visual Studio Code or a text editor

## Installation
To utilize the background image from toptal.com, download the background into your images folder. Then place the following in your css:

```css
    body {
  background-image: url("images/connectwork.png");
  background-repeat: repeat;
  background-position: center;
}
```

To utilize Bootstrap components, grid, and other styles, insert the following link into the head of your html document:

```html
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
    integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
```

## Author
Eric LaFontsee 

## Contact
Email - elafontsee@gmail.com

## License
MIT License

## Acknowledgments
Anthony Cooper(Instructor) - For help with revisions and debugging of the javaScript.
