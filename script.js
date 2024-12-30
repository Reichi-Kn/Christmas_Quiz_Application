const questions = [
    {
        question: "けたくんの誕生日はいつ？",
        answers: [
            { text: "8/5", correct: false, feedback: "ぶぶー。8/5は付き合った日でしたー。初めて見た花火も、熱海の花火もめっちゃきれいだったね！あーちゃんの浴衣もかあいかった！" },
            { text: "2/8", correct: true, feedback: "大正解！2/8はけたくんのお誕生日です。あーちゃんにもらった香水のにおいだーいすき！" },
            { text: "8/31", correct: false, feedback: "ぶぶー。8/31はスカイツリーと浅草に行った日でした。付き合ってから初めてのおでかけで楽しかったね！" },
            { text: "5/4", correct: false, feedback: "ぶぶー。5/4は舎人公園へピクニックに行った日でしたー。この時にとった写真お気に入り！" }
        ]
    },
    {
        question: "あーちゃんの誕生日はいつ？",
        answers: [
            { text: "12/13", correct: false, feedback: "ぶぶー。12/23は青の洞窟とてんぼうパークに行った日でしたー。またピザ食べに行こうね！" },
            { text: "11/12", correct: false, feedback: "ぶぶー。11/12は東京駅に行った日でしたー。あーちゃんの後ろ姿とりはじめた日だね" },
            { text: "3/13", correct: false, feedback: "ぶぶー。3/13はディズニーランドに行った日でしたー。はじめてのお泊り楽しかったね！" },
            { text: "10/17", correct: true, feedback: "大正解！10/17はあーちゃんのお誕生日！チームラボも横浜もきれいで楽しかった！" }
        ]
    },
    {
        question: "けたくんの誕生日とあーちゃんの誕生日を足すと？",
        answers: [
            { text: "12/4", correct: false, feedback: "ぶぶー。12/4は二回目のヨミラン行った日でしたー。観覧車二つあったのびっくりだね！" },
            { text: "11/6", correct: false, feedback: "ぶぶー。11/6は東京ドーム行った日でしたー。カップ麺めっちゃ取れてびっくりしたね！" },
            { text: "12/25", correct: true, feedback: "大正解！足したらクリスマスでしたー。ちなみに引き算したら8/9、惜しいね" },
            { text: "12/21", correct: false, feedback: "ぶぶー。12/21は初めてヨミラン行った日でしたー。めっちゃ寒くてずっとくっついてたね" }
        ]
    },
    {
        question: "12/29時点であーちゃんとの写真とビデオは全部で何枚でしょうか？",
        answers: [
            { text: "3270枚", correct: true, feedback: "大正解！3270枚でしたー。もっともっと増やしてこーね！" },
            { text: "2024枚", correct: false, feedback: "ぶぶー。一年あっと言う間だったね。2025年もよろしくね！" },
            { text: "2990枚", correct: false, feedback: "ぶぶー。1番とまよったでしょ？この数字はてきとうに決めたから意味はない！" },
            { text: "1484枚", correct: false, feedback: "ぶぶー。数字がいしばしなの気づいたかな？" }
        ]
    },
    {
        question: "はじめておそろいで買ったものは何でしょうか？",
        answers: [
            { text: "ペンギン", correct: false, feedback: "ぶぶー。ペンギンはサンシャイン水族館で買ったね！" },
            { text: "イルカ", correct: false, feedback: "ぶぶー。イルカはおそろいで持ってないかな？また次はイルカにするか！" },
            { text: "タコ", correct: false, feedback: "ぶぶー。あーちゃんが持ってるタコさんみたいな人形かあいい" },
            { text: "カメ", correct: true, feedback: "大正解！すみだ水族館で買ったカメさん！また水族館いこーね" }
        ]
    },
    {
        question: "８×５はいくつ？",
        answers: [
            { text: "20", correct: false, feedback: "ぶぶー。しょうがっこうにねんせいからもういっかいおべんきょしよっか" },
            { text: "40", correct: true, feedback: "大正解！あーちゃんのインスタにいっぱい写真増やしてね！" },
            { text: "60", correct: false, feedback: "ぶぶー。けたくんせんせいがおしえてあげるね" },
            { text: "80", correct: false, feedback: "ぶぶー。あーちゃんもじゅくいっしょにきちゃう？" }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;
let hasCongratulated = false;

const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-button');
const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const feedbackMessage = document.getElementById('feedback-message');
const nextButton = document.getElementById('next-button');
const scoreContainer = document.getElementById('score-container');

startButton.addEventListener('click', startQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    hasCongratulated = false;
    startScreen.classList.add('hide');
    questionContainer.classList.remove('hide');
    answerButtons.classList.remove('hide');
    feedbackMessage.classList.add('hide');
    scoreContainer.classList.add('hide');
    nextButton.classList.add('hide');
    nextButton.removeEventListener('click', restartQuiz);
    nextButton.removeEventListener('click', showScore);
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionContainer.innerText = question.question;
    answerButtons.innerHTML = '';
    feedbackMessage.textContent = '';

    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.dataset.feedback = answer.feedback;
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    const feedback = selectedButton.dataset.feedback;

    feedbackMessage.textContent = feedback;
    feedbackMessage.classList.remove('hide');
    feedbackMessage.classList.toggle('correct', correct);
    feedbackMessage.classList.toggle('incorrect', !correct);

    if (correct) {
        score++;
    }

    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
    });

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        nextButton.textContent = "次へ";
        nextButton.removeEventListener('click', showScore);
        nextButton.addEventListener('click', showNextQuestion);
        nextButton.classList.remove('hide');
    } else {
        nextButton.textContent = "スコアを表示";
        nextButton.removeEventListener('click', showNextQuestion);
        nextButton.addEventListener('click', showScore);
        nextButton.classList.remove('hide');
    }
}

function showNextQuestion() {
    feedbackMessage.classList.add('hide');
    nextButton.classList.add('hide');
    showQuestion(questions[currentQuestionIndex]);
}

function showScore() {
    questionContainer.classList.add('hide');
    answerButtons.classList.add('hide');
    feedbackMessage.classList.add('hide');

    const allCorrect = score === questions.length;

    if (allCorrect && !hasCongratulated) {
        scoreContainer.innerHTML = `全問正解おめでとうございます！🎉`;
        nextButton.textContent = "メッセージ表示";
        nextButton.removeEventListener('click', restartQuiz);
        nextButton.addEventListener('click', showCongratulationMessage);
    } else {
        let encouragementMessage = "Merry Christmas！ここまでクイズをしてくれてありがとう！全問正解できたら特別なメッセージが見れるかも…?";
        if (score === 0) {
            encouragementMessage = "Merry Christmas！ここまでクイズをしてくれてありがとう！全問正解できたら特別なメッセージが見れるかも…?";
        } else if (score < questions.length / 2) {
            encouragementMessage = "Merry Christmas！ここまでクイズをしてくれてありがとう！全問正解できたら特別なメッセージが見れるかも…?";
        }

        scoreContainer.innerHTML = `
            あなたのスコア: ${score} / ${questions.length} <br>
            ${encouragementMessage}
        `;
        nextButton.textContent = "もう一度";
        nextButton.removeEventListener('click', showCongratulationMessage);
        nextButton.addEventListener('click', restartQuiz);
    }

    scoreContainer.classList.remove('hide');
    nextButton.classList.remove('hide');
}

function showCongratulationMessage() {
    hasCongratulated = true;
    scoreContainer.innerHTML = `
        🎉Merry Christmas🎉
        今年のクリスマスは一緒に過ごせなくてごめんね。来年は一緒に過ごそうね！ふと思いついてクイズつくってみたの。前に少し見せたことあるんだけど覚えてるかな？すぐ完成させるつもりが一か月以上かかちゃった。あーちゃんが楽しんでくれたらいいな！あーちゃんが謎解きもやってみたいって言ってたからつくったよ！おまけで作ったから完成度は保証しないぞ。来年はプレゼントどーしよっかな？クイズ第2弾がくるかも？
        あーちゃんいつもありがと！これからもかあいいあやサンタでいてね💖
    `;
    nextButton.textContent = "もう一度";
    nextButton.removeEventListener('click', showCongratulationMessage);
    nextButton.addEventListener('click', restartQuiz);
    nextButton.classList.remove('hide');
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.innerHTML = '';
    scoreContainer.classList.add('hide');
    nextButton.classList.add('hide');
    questionContainer.classList.add('hide');
    answerButtons.classList.add('hide');
    feedbackMessage.classList.add('hide');
    startScreen.classList.remove('hide');
}
