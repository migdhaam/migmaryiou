async function addIOU() {
    const item = document.getElementById('item').value;
    const total = document.getElementById('total').value;
    const currency = document.getElementById('currency').value;
    const date = document.getElementById('date').value;

    if (item && total && date) {
        const iouEntry = `${item}, ${total} ${currency}, ${date}`;
        const response = await fetch('https://api.github.com/repos/your-username/your-repo/contents/iou_data.txt', {
            method: 'GET',
            headers: {
                'Authorization': `token YOUR_GITHUB_TOKEN`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            const encodedContent = btoa(data.content + '\n' + iouEntry);
            
            const updateResponse = await fetch('https://api.github.com/repos/your-username/your-repo/contents/iou_data.txt', {
                method: 'PUT',
                headers: {
                    'Authorization': `token YOUR_GITHUB_TOKEN`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.github.v3+json'
                },
                body: JSON.stringify({
                    message: 'Adding new IOU entry',
                    content: encodedContent,
                    sha: data.sha
                })
            });
            
            if (updateResponse.ok) {
                alert('IOU added successfully!');
                clearFields();
                // Optionally update UI or trigger a refresh
            } else {
                alert('Failed to add IOU.');
                console.error('Failed to update file:', updateResponse.statusText);
            }
        } else {
            alert('Failed to fetch existing data.');
            console.error('Failed to fetch file:', response.statusText);
        }
    } else {
        alert('Please fill out all fields.');
    }
}

function clearFields() {
    document.getElementById('item').value = '';
    document.getElementById('total').value = '';
    document.getElementById('currency').value = 'MVR';
    document.getElementById('date').value = '';
}
