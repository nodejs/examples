function main(params) {
    let html = '<html><body><h3><span style="color:red;">Hello ' + params.name + '!</span></h3></body></html>'
    return { headers: { "Content-Type": "text/html" },
             statusCode: 200,
             body: html };
 }