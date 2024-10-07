function calculateHealth() {
            const age = parseInt(document.getElementById("age").value);
            const gender = document.getElementById("gender").value;
            const hb = parseFloat(document.getElementById("hb").value);
            const rbc = parseFloat(document.getElementById("rbc").value);
            const wbc = parseFloat(document.getElementById("wbc").value);
            const plt = parseFloat(document.getElementById("plt").value);

            // Валідація введених даних
            if (isNaN(age) || age < 0 || isNaN(hb) || hb < 0 || isNaN(rbc) || rbc < 0 ||
                isNaN(wbc) || wbc < 0 || isNaN(plt) || plt < 0) {
                alert("Будь ласка, введіть коректні дані. Значення не можуть бути негативними або недійсними.");
                return; // Не продовжувати, якщо є некоректні дані
            }

            // Приховуємо форму і показуємо завантаження
            document.querySelector(".form-container").style.display = "none";
            document.querySelector(".loader").style.display = "flex";

            setTimeout(() => {
                // Приховуємо завантаження
                document.querySelector(".loader").style.display = "none";

                let hbNorm = "";
                let advice = "";

                // Перевірка гемоглобіну
                if (gender === "male") {
                    if (age >= 65) {
                        hbNorm =
                            hb < 125
                                ? "Гемоглобін занижений."
                                : hb > 165
                                    ? "Гемоглобін підвищений."
                                    : "Гемоглобін в нормі.";
                    } else if (age >= 12) {
                        hbNorm =
                            hb < 130
                                ? "Гемоглобін занижений."
                                : hb > 160
                                    ? "Гемоглобін підвищений."
                                    : "Гемоглобін в нормі.";
                    } else {
                        hbNorm = checkChildHb(age, hb);
                    }
                } else if (gender === "female") {
                    if (age >= 65) {
                        hbNorm =
                            hb < 115
                                ? "Гемоглобін занижений."
                                : hb > 160
                                    ? "Гемоглобін підвищений."
                                    : "Гемоглобін в нормі.";
                    } else if (age >= 12) {
                        hbNorm =
                            hb < 120
                                ? "Гемоглобін занижений."
                                : hb > 140
                                    ? "Гемоглобін підвищений."
                                    : "Гемоглобін в нормі.";
                    } else {
                        hbNorm = checkChildHb(age, hb);
                    }
                }

                document.getElementById("hb-result").textContent = `Гемоглобін: ${hbNorm}`;

                // Перевірка еритроцитів
                const rbcStatus = checkRBCNorm(age, rbc);
                document.getElementById("rbc-result").textContent = `Еритроцити: ${rbcStatus}`;

                // Перевірка лейкоцитів
                const wbcStatus = checkWBCNorm(age, wbc);
                document.getElementById("wbc-result").textContent = `Лейкоцити: ${wbcStatus}`;

                // Перевірка тромбоцитів
                const pltStatus = checkPLTNorm(age, plt);
                document.getElementById("plt-result").textContent = `Тромбоцити: ${pltStatus}`;

                // Поради на основі результатів
                if (
                    hbNorm !== "Гемоглобін в нормі." ||
                    rbcStatus !== "Еритроцити в нормі." ||
                    wbcStatus !== "Лейкоцити в нормі." ||
                    pltStatus !== "Тромбоцити в нормі."
                ) {
                    advice = "Примітивні поради: ";
                    if (hbNorm.includes("занижений"))
                        advice += "Пийте більше залізовмісних продуктів. ";
                    if (hbNorm.includes("підвищений")) advice += "Пийте більше води. ";
                    if (rbcStatus.includes("занижені"))
                        advice += "Збільшіть споживання білків. ";
                    if (wbcStatus.includes("занижені"))
                        advice += "Вживайте більше вітамінів для імунітету. ";
                    if (pltStatus.includes("занижені"))
                        advice += "Приймайте вітамін C. ";
                } else {
                    advice = "Ти герой, все в порядку!";
                }

                document.getElementById("advice").textContent = advice;
                document.querySelector(".result").style.display = "block";
            }, 2000); // Імітація завантаження 2 секунди
        }

        function checkChildHb(age, hb) {
            if (age >= 0 && age < 0.25)
                return hb < 145 ? "Гемоглобін занижений." : hb > 225 ? "Гемоглобін підвищений." : "Гемоглобін в нормі.";
            else if (age < 1)
                return hb < 110 ? "Гемоглобін занижений." : hb > 200 ? "Гемоглобін підвищений." : "Гемоглобін в нормі.";
            else if (age < 5)
                return hb < 105 ? "Гемоглобін занижений." : hb > 160 ? "Гемоглобін підвищений." : "Гемоглобін в нормі.";
            else if (age < 12)
                return hb < 115 ? "Гемоглобін занижений." : hb > 145 ? "Гемоглобін підвищений." : "Гемоглобін в нормі.";
            return "Гемоглобін в нормі.";
        }

        function checkRBCNorm(age, rbc) {
            // Логіка для перевірки еритроцитів
            if (age < 12) {
                return rbc < 4 ? "Еритроцити занижені." : rbc > 5.5 ? "Еритроцити підвищені." : "Еритроцити в нормі.";
            } else {
                return rbc < 4.5 ? "Еритроцити занижені." : rbc > 6 ? "Еритроцити підвищені." : "Еритроцити в нормі.";
            }
        }

        function checkWBCNorm(age, wbc) {
            // Логіка для перевірки лейкоцитів
            return wbc < 4 ? "Лейкоцити занижені." : wbc > 10 ? "Лейкоцити підвищені." : "Лейкоцити в нормі.";
        }

        function checkPLTNorm(age, plt) {
            // Логіка для перевірки тромбоцитів
            return plt < 150 ? "Тромбоцити занижені." : plt > 400 ? "Тромбоцити підвищені." : "Тромбоцити в нормі.";
        }