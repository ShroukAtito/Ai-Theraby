<script src="script.js"></script>
document.addEventListener("DOMContentLoaded", function () {
    const chatbotMessages = document.getElementById("chatbot-messages");
    const chatbotInput = document.getElementById("chatbot-input");

    function sendMessage() {
        let userMessage = chatbotInput.value.trim();
        if (userMessage === "") return;

        // عرض رسالة المستخدم
        chatbotMessages.innerHTML += `<div style="text-align:right; color:blue;">أنت: ${userMessage}</div>`;

        // ردود تلقائية بسيطة
        let botResponse = "أنا هنا للمساعدة! 😊";
        if (userMessage.includes("مرحبا") || userMessage.includes("السلام")) {
            botResponse = "أهلاً وسهلاً! كيف يمكنني مساعدتك؟";
        } else if (userMessage.includes("كيف حالك")) {
            botResponse = "أنا بخير، وأنت؟";
        } else if (userMessage.includes("مساعدة")) {
            botResponse = "بالطبع! ما الذي تحتاج مساعدتي فيه؟ 😊";
        }

        // عرض رد الشات بوت
        setTimeout(() => {
            chatbotMessages.innerHTML += `<div style="text-align:left; color:green;">AI: ${botResponse}</div>`;
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }, 1000);

        chatbotInput.value = "";
    }

    chatbotInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});
function startVoiceRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "ar-EG";

    recognition.onresult = function (event) {
        let transcript = event.results[0][0].transcript;
        document.getElementById("chatbot-input").value = transcript;
        sendMessage(); 
    };

    recognition.start();
}
document.getElementById("toggle-mode").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    // حفظ التفضيلات في Local Storage
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("mode", "dark");
    } else {
        localStorage.setItem("mode", "light");
    }
});


window.onload = function () {
    if (localStorage.getItem("mode") === "dark") {
        document.body.classList.add("dark-mode");
    }
};
function botTypingEffect() {
    let avatar = document.getElementById("chatbot-avatar");
    avatar.style.animation = "bounce 0.5s infinite alternate";
    
    setTimeout(() => {
        avatar.style.animation = "none"; 
    }, 2000);
}
function updateMoodAnalysis(userMessage) {
    if (userMessage.includes("سعيد") || userMessage.includes("فرحان")) {
        moodData.datasets[0].data[0]++; 
    } else if (userMessage.includes("حزين") || userMessage.includes("مكتئب")) {
        moodData.datasets[0].data[1]++; 
    } else if (userMessage.includes("قلق") || userMessage.includes("متوتر")) {
        moodData.datasets[0].data[2]++; 
    } else {
        moodData.datasets[0].data[3]++; 
    }

    moodChart.update();
}

function sendMessage() {
    let userMessage = chatbotInput.value.trim();
    if (userMessage === "") return;

    chatbotMessages.innerHTML += `<div style="text-align:right; color:blue;">أنت: ${userMessage}</div>`;
    
    let botResponse = "أنا هنا للمساعدة! 😊";
    if (userMessage.includes("مرحبا") || userMessage.includes("السلام")) {
        botResponse = "أهلاً وسهلاً! كيف يمكنني مساعدتك؟";
    } else if (userMessage.includes("كيف حالك")) {
        botResponse = "أنا بخير، وأنت؟";
    } else if (userMessage.includes("مساعدة")) {
        botResponse = "بالطبع! ما الذي تحتاج مساعدتي فيه؟ 😊";
    }

    botTypingEffect(); 

    setTimeout(() => {
        chatbotMessages.innerHTML += `<div style="text-align:left; color:green;">AI: ${botResponse}</div>`;
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }, 2000);

    chatbotInput.value = "";
    function sendMessage() {
        let userMessage = chatbotInput.value.trim();
        if (userMessage === "") return;
    
        chatbotMessages.innerHTML += `<div style="text-align:right; color:blue;">أنت: ${userMessage}</div>`;
        
        let botResponse = "أنا هنا للمساعدة! 😊";
        if (userMessage.includes("مرحبا") || userMessage.includes("السلام")) {
            botResponse = "أهلاً وسهلاً! كيف يمكنني مساعدتك؟";
        } else if (userMessage.includes("كيف حالك")) {
            botResponse = "أنا بخير، وأنت؟";
        } else if (userMessage.includes("مساعدة")) {
            botResponse = "بالطبع! ما الذي تحتاج مساعدتي فيه؟ 😊";
        }
    
        botTypingEffect();
        updateMoodAnalysis(userMessage);
    
        setTimeout(() => {
            chatbotMessages.innerHTML += `<div style="text-align:left; color:green;">AI: ${botResponse}</div>`;
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }, 2000);
    
        chatbotInput.value = "";
    }
    updateMoodAnalysis(userMessage);

    
}
const ctx = document.getElementById("moodChart").getContext("2d");
const moodData = {
    labels: ["سعيد 😊", "حزين 😔", "قلق 😟", "محايد 😐"],
    datasets: [{
        label: "تحليل الحالة النفسية",
        data: [3, 2, 1, 4], 
        backgroundColor: ["#4CAF50", "#F44336", "#FF9800", "#9E9E9E"]
    }]
};

const moodChart = new Chart(ctx, {
    type: "pie",
    data: moodData
});
// دالة لتحديث نقاط المستخدم بناءً على الرسائل اللي بيكتبها
function updateUserPoints(userMessage) {
    let points = 0;

    // لو المستخدم كتب رسالة مفيدة، يحصل على نقاط
    if (userMessage.includes("نصيحة") || userMessage.includes("مساعدة") || userMessage.includes("كيف")) {
        points = 5; // كافئ المستخدم بـ 5 نقاط
    }

    if (points > 0) {
        const userPointsRef = ref(database, 'userPoints');
        push(userPointsRef, {
            message: userMessage,
            points: points,
            timestamp: new Date().toISOString()
        });

        // تحديث واجهة المستخدم لإظهار النقاط
        let pointsDisplay = document.getElementById("points-display");
        let currentPoints = parseInt(pointsDisplay.innerText) || 0;
        pointsDisplay.innerText = currentPoints + points;
    }
}
// دالة لتحديد نمط الرد بناءً على شخصية المستخدم
function getPersonalizedResponse(userMBTI, userMessage) {
    const responses = {
        "INTJ": ["أحب طريقة تفكيرك المنطقية! هل لديك أي خطط جديدة؟ 🎯"],
        "ENTP": ["أفكارك مميزة كالعادة! ما رأيك في مناقشة شيء جديد؟ 💡"],
        "INFJ": ["أنت شخص عميق جدًا! كيف تشعر اليوم؟ 🌿"],
        "ENFP": ["أنت مليء بالطاقة! شاركني فكرة جديدة تحبها! 🚀"],
        "ISTP": ["تحليل رائع! هل جربت حل مشكلات تقنية مؤخرًا؟ 🛠"],
        "ESTJ": ["أحب تنظيمك! كيف تسير خططك لهذا الأسبوع؟ 📅"],
        "ISFP": ["إبداعك واضح! هل قمت برسم شيء جديد؟ 🎨"],
        "ESFJ": ["أنت صديق رائع! كيف كانت تجربتك الأخيرة في التواصل مع الآخرين؟ 😊"]
    };

    // الرد الافتراضي لو لم يتم تحديد شخصية المستخدم
    let defaultResponse = "أحب التحدث معك! أخبرني المزيد عن أفكارك. 😊";

    return responses[userMBTI] ? responses[userMBTI][0] : defaultResponse;
}

// تعديل sendMessage() لتخصيص الردود
function sendMessage() {
    let userMessage = document.getElementById("user-input").value.trim();
    if (userMessage === "") return;

    const userMBTIRef = ref(database, 'userMBTI');
    get(userMBTIRef).then((snapshot) => {
        let userMBTI = snapshot.val() ? snapshot.val().mbtiType : "ENFP";
        let botResponse = getPersonalizedResponse(userMBTI, userMessage);
        
        displayMessage(userMessage, "user");
        setTimeout(() => {
            displayMessage(botResponse, "bot");
        }, 1000);
    });

    document.getElementById("user-input").value = "";
}

function sendMessage() {
    let userMessage = chatbotInput.value.trim();
    if (userMessage === "") return;

    chatbotMessages.innerHTML += `<div style="text-align:right; color:blue;">أنت: ${userMessage}</div>`;

    let botResponse = "أنا هنا للمساعدة! 😊";
    if (userMessage.includes("مرحبا") || userMessage.includes("السلام")) {
        botResponse = "أهلاً وسهلاً! كيف يمكنني مساعدتك؟";
    } else if (userMessage.includes("كيف حالك")) {
        botResponse = "أنا بخير، وأنت؟";
    } else if (userMessage.includes("مساعدة")) {
        botResponse = "بالطبع! ما الذي تحتاج مساعدتي فيه؟ 😊";
    }

    botTypingEffect();
    updateMoodAnalysis(userMessage); 

   
    saveMessageToDB(userMessage, botResponse);
    updateUserPoints(userMessage);
    updateUserMBTI(userMessage);



    setTimeout(() => {
        chatbotMessages.innerHTML += `<div style="text-align:left; color:green;">AI: ${botResponse}</div>`;
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }, 2000);

    chatbotInput.value = "";
    // دالة تحليل MBTI بناءً على الرسائل
function analyzeMBTI(userMessage) {
    let mbtiScores = {
        I: 0, E: 0, // Introvert vs Extrovert
        S: 0, N: 0, // Sensing vs Intuition
        T: 0, F: 0, // Thinking vs Feeling
        J: 0, P: 0  // Judging vs Perceiving
    };

    const words = userMessage.toLowerCase().split(" ");
    
    words.forEach(word => {
        if (["هادئ", "تفكير", "قراءة", "انعزال"].includes(word)) mbtiScores.I += 1;
        if (["اجتماعي", "تواصل", "مرح", "حفلة"].includes(word)) mbtiScores.E += 1;
        if (["تفاصيل", "حقائق", "واقعي"].includes(word)) mbtiScores.S += 1;
        if (["إبداع", "تخيل", "إحساس"].includes(word)) mbtiScores.N += 1;
        if (["منطق", "تحليل", "سبب"].includes(word)) mbtiScores.T += 1;
        if (["عاطفة", "شعور", "تعاطف"].includes(word)) mbtiScores.F += 1;
        if (["نظام", "تنظيم", "التخطيط"].includes(word)) mbtiScores.J += 1;
        if (["مرونة", "عفوية", "حرية"].includes(word)) mbtiScores.P += 1;
    });

    let mbtiType = (mbtiScores.I >= mbtiScores.E ? "I" : "E") +
                   (mbtiScores.S >= mbtiScores.N ? "S" : "N") +
                   (mbtiScores.T >= mbtiScores.F ? "T" : "F") +
                   (mbtiScores.J >= mbtiScores.P ? "J" : "P");

    return mbtiType;
}

function updateUserMBTI(userMessage) {
    let detectedMBTI = analyzeMBTI(userMessage);

    if (detectedMBTI) {
        const userMBTIRef = ref(database, 'userMBTI');
        push(userMBTIRef, {
            message: userMessage,
            mbtiType: detectedMBTI,
            timestamp: new Date().toISOString()
        });

        // تحديث واجهة المستخدم
        let mbtiDisplay = document.getElementById("mbti-display");
        mbtiDisplay.innerText = "شخصيتك المتوقعة: " + detectedMBTI;
    }
}

}
