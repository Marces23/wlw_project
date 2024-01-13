document.addEventListener('DOMContentLoaded', function() {
    // Generate data for temperature chart
    let labels = [];
    let data = [];
    for (let i = 0; i < 30; i++) {
        labels.push('');
        data.push(Math.floor(Math.random() * 40) - 30);
    }
    

    // Create temperature chart
    let ctx = document.getElementById('temperatureChart').getContext('2d');
    let chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    
    showToast('Your message here');

});