
/**
 * Downloads a file onto the user's computer
 * Source: https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server
 * @param filename 
 * @param text 
 */
function downloadFile(filename: string, text: string) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

function Download() {
    return <h1 onClick={() => downloadFile('hello.txt', 'This is a hello message')}>Hello World</h1>;
}

export default Download;