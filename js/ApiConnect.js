class ApiConnect
{
    httpUri = ""
    schemaJson = {}

    constructor(uri, schema)
    {
        this.httpUri = uri;
        this.schemaJson = schema;
    }

    getUri()
    {
        return this.httpUri;
    }

    async getInfoGet()
    {
        const prom = await fetch(this.httpUri);
        const myJson = await prom.json();

        return await myJson;
    }

    async putInfoPost(bodyHttp)
    {
        console.log(this.validateSchema(this.schemaJson, bodyHttp));
        if(this.validateSchema(this.schemaJson, bodyHttp))
        {
            let request = await fetch(this.httpUri, 
            {
                method: "POST",
                body: JSON.stringify(bodyHttp)
    
            });
            
            let jsonResponse = await request.json();
            
            return await jsonResponse;
        }
        else
        {
            return null;
        }
    }

    validateSchema(schema, object)
    {
        let arrBoolValidation = [];
        let boolCounter = false;
    
        for (const keySchema of Object.keys(schema)) {
            for (const keyOject of Object.keys(object)) {
                if(keySchema == keyOject)
                    boolCounter = boolCounter || true;
                else
                    boolCounter = boolCounter || false;
            }
            arrBoolValidation.push(boolCounter);
            boolCounter = false;
        }
    
        for (const bool of arrBoolValidation) {
            if (!bool)
                return false;
        }
        
        return true;
    }
}

export { ApiConnect };