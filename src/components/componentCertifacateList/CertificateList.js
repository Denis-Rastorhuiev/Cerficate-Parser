import './certificateList.css';

function CertificateList({ certificates, onClick, drag, select }) {
  return (
    <div>
      {certificates.length > 0 ? (
        !drag ? (
          certificates.map((c) => (
            <div
              className={
                c.idName === select ? 'certificate selected' : 'certificate'
              }
              key={c.idName}
              onClick={onClick}
              data-name={c.idName}
            >
              {c.commonName}{' '}
              {c.idName === select ? (
                  // Забезпечення відсутності пригаючого поля інформації залишаючи місце під знак ">"
                  //у вибраного елемента
                <p style={{ fontSize: 'large'}}>&#62;</p>
              ) :
                  <p style={{ fontSize: 'large', visibility:'hidden'}}>&#62;</p>}
            </div>
          ))
        ) : (
          certificates.map((c) => (
            <div
              className={c.idName === select ? 'selected' : 'certificate'}
              key={c.idName}
              data-name={c.idName}
            >
              {c.commonName}
              {/* Забезпечення відсутності пригаючого поля інформації залишаючи місце під знак ">"*/}
              {/*у вибраного елемента*/}
              <p style={{ fontSize: 'large', visibility:'hidden'}}>&#62;</p>
            </div>
          ))
        )
      ) : (
        <div className="empty-list">Нема жодного сертифіката</div>
      )}
    </div>
  );
}

export default CertificateList;
