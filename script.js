const questions = [
	{
		question: "В каком году было принято Соборное Уложение?",
		answers: ["1650", "1497", "1649", "1550"],
		correct: 3, 
	},
	{
		question: "К реформам Избранной Рады не относится..?",
		answers: ["Принятие Судебника", "Начало чеканки медных монет", "Создание стрелецкого войска", "Церковная реформа"],
		correct: 2, 
	},
	{
		question: "В каком году Иван IV венчался на царствование?",
		answers: ["1533", "1550", "1547", "1538"],
		correct: 3,  
	},
	{
		question: "Что стало причиной соляного бунта?",
		answers: ["Повышение цен на соль", "Запрет на разработку солевых залежей", "Монополия государства на торговлю солью", "Запрет на импорт товаров"],
		correct: 1, 
	},
	{ 
		question: "Результатом Ливонской войны стало..?",
		answers: ["Получение выхода к Балтийскому морю", "раздел Речи Псополитой", "Распад Швеции", "Потеря земель в Прибалтике"],
		correct: 4, 
	} 

];

const headerContainer = document.querySelector("#header"); 
const listContainer = document.querySelector("#list"); 
const submitBtn = document.querySelector("#submit");

let score = 0; 
let questionIndex = 0; 

clearPage();
showQuestion();

submitBtn.onclick = checkAnswer; 

function clearPage(){
	headerContainer.innerHTML = ""; 
	listContainer.innerHTML = ""; 
} 

function showQuestion(){
	console.log("showQuestion");
	
	// Вопрос 
	// %...% - обрамление шаблонной метки 
	const headerTemplate = `<h2 class="title">%title%</h2>`; 
	const title = headerTemplate.replace("%title%", questions[questionIndex]["question"]); 
	
	headerContainer.innerHTML = title; 
	
	// Варианты овтетов 
	
	let answerNumber = 1; 
	
	for (answerText of questions[questionIndex]["answers"]) {
		
		const questionTemplate = 
			`<li>
				<label>
					<input value="%number%" type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label> 
			</li>`; 
				
		const answerHTML = questionTemplate
							.replace("%answer%", answerText)
							.replace("%number%", answerNumber); 
			
		listContainer.innerHTML += answerHTML; 
		answerNumber++;  
	} 	
} 

function checkAnswer(){
	console.log("checAnswer started!");  
	
	const checkedRadio = listContainer.querySelector("input:checked");
	console.log(checkedRadio); 
		
	if (!checkedRadio){
		submitBtn.blur(); 
		return
	}
	
	const userAnswer = parseInt(checkedRadio.value);
	
	if (userAnswer === questions[questionIndex]["correct"]){
		score++; 
	} 
	console.log("score = ", score);  
	
	if (questionIndex !== questions.length - 1){
		console.log("Это не псоледний вопрос");
		questionIndex++;
		clearPage(); 
		showQuestion();
		return; 		
	} else {
		console.log("Это последний вопрос");
		clearPage();
		showResults(); 
	}
}  

function showResults(){
	console.log(score); 
	
	const resultsTemplate = 
			`<h2 class="title">%title%</h2>
			 <h3 class="summary">%message%</h3>
			 <p class="result">%result%</p>`;
			
	let title, message; 

	if (score === questions.length){
		title = "Поздравляю!";
		message = "Все ответы верны 🖖🏻"; 
	} else if ((score * 100) / questions.length >= 50) {
		title = "Not-bad результат!";
		message = "Более половины ответов верны 👌🏻";  
	} else {
		title = "Пока такое себе (";
		message = "Меньше половины ответов верны 🤙🏻";  
	} 
		
		
	let result = `${score} из ${questions.length}`; 
	
	const finalMessage = resultsTemplate
							.replace("%title%", title)
							.replace("%message%", message)
							.replace("%result%", result) 
							
	headerContainer.innerHTML = finalMessage; 
	
	submitBtn.blur(); 
	submitBtn.innerText = "Начать заново"; 
	submitBtn.onclick = function(){
		history.go();
	};  
}   

