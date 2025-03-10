let radio;
let input;
let submitButton;
let resultP;
let table;
let currentQuestion = 0;
let correctCount = 0;
let incorrectCount = 0;
let questionP;
let scoreP;

function preload() {
  table = loadTable('questions.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#e7c6ff");

  textSize(30);
  textAlign(CENTER);

  // 顯示左上角的文字
  let nameTag = createP('413730325 李薏玟');
  nameTag.position(10, 10);
  nameTag.style('font-size', '20px');

  // 建立選擇題
  radio = createRadio();
  radio.style('font-size', '30px');

  // 建立填充題輸入框
  input = createInput();
  input.style('font-size', '30px');
  input.hide();

  // 建立送出按鈕
  submitButton = createButton('送出');
  submitButton.style('font-size', '30px');
  submitButton.mousePressed(checkAnswer);

  // 顯示結果的段落
  resultP = createP('');
  resultP.style('font-size', '30px');

  // 顯示題目的段落
  questionP = createP('');
  questionP.style('font-size', '30px');
  questionP.position(windowWidth / 2 - 100, windowHeight / 2 - 200);

  // 顯示答對答錯題數的段落
  scoreP = createP('');
  scoreP.style('font-size', '20px');
  scoreP.position(10, 50);

  displayQuestion();
}

function draw() {
  background("#e7c6ff");
  textSize(30);
  textAlign(CENTER);
}

function displayQuestion() {
  if (currentQuestion < table.getRowCount()) {
    let question = table.getString(currentQuestion, 'question');
    let options = ['A', 'B', 'C', 'D'];
    radio.html('');
    questionP.html(question);
    if (question.startsWith("填充題")) {
      radio.hide();
      input.show();
      input.position(windowWidth / 2 - 50, windowHeight / 2 - 50);
    } else {
      radio.show();
      input.hide();
      options.forEach(option => {
        radio.option(table.getString(currentQuestion, option), table.getString(currentQuestion, option));
      });
    }
    radio.position(windowWidth / 2 - 50, windowHeight / 2 - 50);
    submitButton.position(windowWidth / 2 - 30, windowHeight / 2);
    resultP.position(windowWidth / 2 - 50, windowHeight / 2 + 50);
  } else {
    questionP.html('');
    text(`答對題數: ${correctCount} 題, 答錯題數: ${incorrectCount} 題`, windowWidth / 2, windowHeight / 2);
  }
  updateScore();
}

function checkAnswer() {
  let answer;
  if (table.getString(currentQuestion, 'question').startsWith("填充題")) {
    answer = input.value();
  } else {
    answer = radio.value();
  }
  const correctAnswer = table.getString(currentQuestion, 'correct');
  if (answer === correctAnswer) {
    resultP.html('答對了！');
    resultP.style('color', '#008000');
    correctCount++;
    submitButton.html('下一題');
    submitButton.mousePressed(nextQuestion);
  } else {
    resultP.html('答錯了，再試一次。');
    resultP.style('color', '#f94144');
    submitButton.html('再試一次');
    submitButton.mousePressed(checkAnswer);
    incorrectCount++;
  }
  updateScore();
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < table.getRowCount()) {
    displayQuestion();
    submitButton.html('送出');
    submitButton.mousePressed(checkAnswer);
  } else {
    resultP.html(`答對題數: ${correctCount} 題, 答錯次數: ${incorrectCount} 題`);
    resultP.style('color', '#000000');
    submitButton.hide();
    radio.hide();
    input.hide();
  }
}

function updateScore() {
  scoreP.html(`答對題數: ${correctCount} 題, 答錯次數: ${incorrectCount} 題`);
}
