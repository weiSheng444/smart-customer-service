const API_KEY = 'c7b12cd08fde4d0fa34b4e8b34850671.1du1Wym8GpgjlfyC';
const API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';

// 绑定点击事件到聊天按钮
document.querySelector('.float-button').addEventListener('click', toggleChat);
document.querySelector('.btn.primary').addEventListener('click', toggleChat);
document.querySelector('.help-card .chat-icon').parentElement.addEventListener('click', toggleChat);

function toggleChat() {
    const chatDialog = document.getElementById('chatDialog');
    chatDialog.classList.toggle('active');
}

async function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // 添加用户消息到对话框
    addMessage(message, 'user');
    input.value = '';
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'glm-4',
                messages: [{
                    role: 'user',
                    content: message
                }]
            })
        });
        
        const data = await response.json();
        const reply = data.choices[0].message.content;
        
        // 添加系统回复到对话框
        addMessage(reply, 'system');
    } catch (error) {
        console.error('Error:', error);
        addMessage('抱歉，发生了一些错误，请稍后再试。', 'system');
    }
}

function addMessage(content, type) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = content;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// 支持按回车发送消息
document.getElementById('userInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// 添加 FAQ 相关函数
function toggleFAQ() {
    const faqDialog = document.getElementById('faqDialog');
    faqDialog.classList.toggle('active');
}

// 修改绑定常见问题按钮点击事件
document.querySelector('.nav-btn').addEventListener('click', toggleFAQ);
document.querySelector('.btn.secondary').addEventListener('click', toggleFAQ);

// 添加问题展开/收起功能
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');
    });
}); 