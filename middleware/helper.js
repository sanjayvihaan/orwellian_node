const helper = async (ml_result, ipscore_result) => {
    ipscore_result = ipscore_result.suspicious
    // console.log(ml_result) 
    // console.log(ipscore_result) 

    if(ipscore_result === true){
        ml_result = 'suspicious'
    } else {
        ml_result = 'safe' 
    }

    return ml_result

}

module.exports = { helper }