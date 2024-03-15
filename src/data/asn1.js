import ASN1 from '@lapo/asn1js';

const asn1 = (file, fileName) => {
  const result = ASN1.decode(file);
  if (result.typeName() !== 'SEQUENCE') {
    throw new Error(
      'Неправильна структура конверта сертифіката (очікується SEQUENCE)'
    );
  }

  let CommonName;

  for (let i = 0; i < result.sub[0].sub[5].sub.length; i++) {
    if (
      result.sub[0].sub[5].sub[i].sub[0].sub[0]
        .content()
        .toString()
        .includes('commonName')
    ) {
      CommonName = result.sub[0].sub[5].sub[i].sub[0].sub[1].content();
    }
  }

  return {
    idName: fileName,
    commonName: CommonName,
    issuerCN: result.sub[0].sub[3].sub[2].sub[0].sub[1].content(),
    validFrom: result.sub[0].sub[4].sub[0].content(),
    validTill: result.sub[0].sub[4].sub[1].content(),
    dateAdded: Date.now(),
  };
};

export default asn1;