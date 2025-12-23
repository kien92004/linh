const music = document.getElementById("bgMusic");
const typeSound = document.getElementById("typeSound");
const wishText = document.getElementById("wishText");
const introScreen = document.getElementById("introScreen");
const photos = document.querySelectorAll(".photo-item");

let wishesStarted = false;

function playMusic() {
    music.play();
    // Lưu trạng thái đang phát
    localStorage.setItem("musicPlaying", "true");
    // Cập nhật thời gian thực vào localStorage mỗi giây
    setInterval(() => {
        localStorage.setItem("musicCurrentTime", music.currentTime);
    }, 1000);
}

function typeText(el, text, speed, callback) {
    let i = 0;
    const interval = setInterval(() => {
        el.textContent += text[i++];
        if (typeSound) { typeSound.currentTime = 0; typeSound.play().catch(() => {}); }
        if (i >= text.length) {
            clearInterval(interval);
            if (callback) callback();
        }
    }, speed);
}

function startMain() {
    photos.forEach((photo, index) => {
        setTimeout(() => photo.classList.add("show"), index * 300);
    });

    setTimeout(() => {
        typeText(document.getElementById("nameText"), "Cơ trưởng Linh 🛫", 150, () => {
            typeText(document.getElementById("dobText"), "24.12.2025", 100, () => {
                document.getElementById("hint").classList.remove("hidden");
            });
        });
    }, 1500);
}

introScreen.addEventListener("click", () => {
    introScreen.classList.add("fade-out");
    setTimeout(startMain, 800);
});

document.addEventListener("click", () => {
    if (!wishesStarted && !document.getElementById("hint").classList.contains("hidden")) {
        document.getElementById("hint").classList.add("hidden");
        music.play();
        wishesStarted = true;
        startWishes();
    }
});

const wishes = [
    "Chúc m một ngày sinh nhật thật ý nghĩa! 💙",
    "Luôn tươi cười và hạnh phúc như màu trời này nhé ☁️",
    "Mọi điều tốt đẹp nhất sẽ đến với m ✨",
    "Tuổi mới rạng rỡ và thành công rực rỡ! 🎈"
];
let wishIndex = 0;

function startWishes() {
    if (wishIndex < wishes.length) {
        const currentText = wishes[wishIndex];
        const sentenceSpan = document.createElement("span");
        sentenceSpan.style.display = "block";
        sentenceSpan.style.marginBottom = "10px";
        wishText.appendChild(sentenceSpan);

        typeText(sentenceSpan, currentText, 70, () => {
            wishIndex++;
            setTimeout(startWishes, 1000); 
        });
    } else {
        // Hiện nút chuyển trang khi gõ xong hết
        const btnNext = document.getElementById("btnNext");
        btnNext.classList.remove("hidden");
        btnNext.classList.add("show");
    }
}