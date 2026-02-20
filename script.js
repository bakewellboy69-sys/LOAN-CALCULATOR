function calculateLoan() {
    const amount = parseFloat(document.getElementById("loanAmount").value);
    const annualRate = parseFloat(document.getElementById("interestRate").value);
    const years = parseFloat(document.getElementById("loanYears").value);

    const resultDiv = document.getElementById("loanResult");
    const tableDiv = document.getElementById("amortizationTable");

    if (isNaN(amount) || isNaN(annualRate) || isNaN(years) || amount <= 0 || years <= 0) {
        resultDiv.innerText = "Please enter valid loan details.";
        tableDiv.innerHTML = "";
        return;
    }

    const monthlyRate = annualRate / 100 / 12;
    const totalPayments = years * 12;

    const monthlyPayment = amount * 
        (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
        (Math.pow(1 + monthlyRate, totalPayments) - 1);

    const totalPaid = monthlyPayment * totalPayments;
    const totalInterest = totalPaid - amount;

    resultDiv.innerHTML = `
        Monthly Payment: <strong>${monthlyPayment.toFixed(2)}</strong><br>
        Total Interest: <strong>${totalInterest.toFixed(2)}</strong><br>
        Total Repayment: <strong>${totalPaid.toFixed(2)}</strong>
    `;

    let balance = amount;
    let tableHTML = `
        <table>
            <tr>
                <th>Month</th>
                <th>Payment</th>
                <th>Interest</th>
                <th>Principal</th>
                <th>Balance</th>
            </tr>
    `;

    for (let i = 1; i <= totalPayments; i++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        balance -= principalPayment;

        tableHTML += `
            <tr>
                <td>${i}</td>
                <td>${monthlyPayment.toFixed(2)}</td>
                <td>${interestPayment.toFixed(2)}</td>
                <td>${principalPayment.toFixed(2)}</td>
                <td>${balance > 0 ? balance.toFixed(2) : "0.00"}</td>
            </tr>
        `;
    }

    tableHTML += "</table>";
    tableDiv.innerHTML = tableHTML;
}
