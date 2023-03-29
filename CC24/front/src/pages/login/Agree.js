import React from 'react';

function Agree() {
    const rpcUrl = "https://goerli.infura.io/v3/699298c6519248f2a05f048e43e8d364";
    const didResolver = new Resolver(getResolver({ rpcUrl, name: "goerli" }));

    // const didDocument = (await didResolver.resolve(ethrDidOnGoerliNamed.did)).didDocument;
    const didDocument = (
    await didResolver.resolve(
        "did:ethr:goerli:0x03df8e54a30e3906d243d7402c59b82b5d854223ba3ae969ea23d2c12b8da49c5e"
    )
    ).didDocument;
    return (
        <div>
            
        </div>
    )
}

export default Agree