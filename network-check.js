
// SCHOOL NETWORK CHECK

const SCHOOL_PUBLIC_IP = "49.43.88.83";

async function checkSchoolNetwork() {
    const resultBox = document.createElement("div");

    resultBox.style.cssText = `
        position: fixed;
        top: 10px;
        left: 10px;
        right: 10px;
        z-index: 999999;
        background: white;
        color: #222;
        padding: 20px;
        border: 2px solid #333;
        border-radius: 12px;
        font-family: Arial, sans-serif;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;

    resultBox.innerHTML = "<h3>Checking school network...</h3>";
    document.body.appendChild(resultBox);

    try {
        const response = await fetch(
            "https://api.ipify.org?format=json",
            { cache: "no-store" }
        );

        if (!response.ok) {
            throw new Error("Could not verify network.");
        }

        const data = await response.json();

        const currentIP = String(data.ip).trim();
        const expectedIP = SCHOOL_PUBLIC_IP.trim();

        if (currentIP === expectedIP) {
            resultBox.innerHTML = `
                <h3 style="color:green;">School Network Verified</h3>
                <p>Access permitted.</p>
            `;

            window.schoolNetworkAllowed = true;

            setTimeout(() => {
                resultBox.remove();
            }, 2000);

        } else {
            window.schoolNetworkAllowed = false;

            resultBox.innerHTML = `
                <h3 style="color:red;">Access Restricted</h3>
                <p>This examination portal is available only on the school network.</p>
            `;

            document.body.innerHTML = "";
            document.body.appendChild(resultBox);
        }

    } catch (error) {
        window.schoolNetworkAllowed = false;

        resultBox.innerHTML = `
            <h3 style="color:red;">Network Check Failed</h3>
            <p>${error.message}</p>
            <p>Please check your internet connection and try again.</p>
        `;

        document.body.innerHTML = "";
        document.body.appendChild(resultBox);
    }
}

window.addEventListener("load", checkSchoolNetwork);
