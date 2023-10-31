document.addEventListener("DOMContentLoaded", async function () {
    const buy = document.getElementById("textbox-buy");
    const sell = document.getElementById("textbox-sell");
    const submitButton = document.getElementById("submit");

    const current = await browser.storage.local.get("templates");
    const templates = current.templates;

    if (templates) {
        buy.value = templates.buy;
        sell.value = templates.sell;
    }

    submitButton.addEventListener("click", async function () {
        await browser.storage.local.set({
            templates: {
                buy: buy.value,
                sell: sell.value,
            },
        });
        buy.disabled = sell.disabled = submitButton.disabled = true;
    });
});
