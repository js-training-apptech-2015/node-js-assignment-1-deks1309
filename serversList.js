function Server(name, url){
    this.name = name;
    this.url = url;
}

module.exports = [
                    new Server('rocky-sierra-3635', 'rocky-sierra-3635.herokuapp.com'),
                    new Server('polar-waters-8630', 'polar-waters-8630.herokuapp.com'), 
                    new Server('aqueous-ocean-2864', 'aqueous-ocean-2864.herokuapp.com')
                 ]