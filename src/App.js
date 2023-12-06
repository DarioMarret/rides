/* eslint-disable jsx-a11y/alt-text */
import { decode } from 'js-base64';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
 
  const [data, setData] = useState({
    
  });
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    // PRUEBAS
    // const query = link.split('?')[1]
    // if (query) {
    //   setData(JSON.parse(decode(query)))
    // }
    // PRODUCCION
    console.log(window.location.search)
    if (window.location.search.split('?')[1]) {
      console.log('entro', JSON.parse(decode(window.location.search.split("?")[1])))
      setData(JSON.parse(decode(window.location.search.split("?")[1])))
    }
    if (window.location.href.split('/pdf/')[1]) {
      let deco = decode(window.location.href.split('/pdf/')[1])
      console.log("Decode: ",deco)
      let DecoPar = JSON.parse(deco)
      console.log("DecoPar: ", DecoPar)
      console.log("DecoPar: ", typeof DecoPar)
      console.log(decode(window.location.href.split('/pdf/')[1]))
      setData(DecoPar)
    }
    // console.log(window.location.search)
    // if (window.location.search.split('?')[1]) {
    //   console.log('entro', JSON.parse(decode(window.location.search.split("?")[1])))
    //   setData(JSON.parse(decode(window.location.search.split("?")[1])))
    // }
    setLoader(false)
  }, []);


  return (
    <div className="container">
      {loader ? <div></div>:
      <div className="factura"
        style={{
          marginTop: '10px',
        }}
      >
        <div className="factura_empresa">
          <div className='factura_empresa_datos'
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <img className='factura_empresa_datos_logo' src={data.logo_empresa} />
            <div className='factura_empresa_datos_info'>
              <p className='bold'>{data.infoTributaria.nombreComercial}</p>
              <p
                style={{
                  fontSize: '12px',
                }}
              >{data.infoTributaria.dirMatriz}</p>
              <p
                style={{
                  fontSize: '12px',
                }}
              >{data.infoFactura.obligadoContabilidad === 'SI' ? 'Obligado a llevar contabilidad' : 'No obligado a llevar contabilidad'}</p>
               <p
                style={{
                  fontSize: '12px',
                }}
              >CONTRIBUYENTE RÉGIMEN RIMPE</p>
            </div>
          </div>
          <div className='factura_empresa_infotrib'
            style={{
              // backgroundColor: '#292929',
            }}>
          
              <p className='bold'>R.U.C.: {data.infoTributaria.ruc}</p>
              <p>Factura - {data.infoTributaria.estab}-{data.infoTributaria.ptoEmi}-{data.infoTributaria.secuencial}</p>
              <div>
                <p className='bold'>Clave de acceso </p>
                <p  
                  style={{
                    fontSize: '12px',
                  }}
                >{data.infoTributaria.claveAcceso}</p>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <p className='bold'>Ambiente: {data.infoTributaria.ambiente === '1' ? 'PRUEBA' : 'PRODUCCION'}</p>
                <p className='bold'>Emisión: NORMAL</p>
              </div>
          </div>
        </div>
        <div className="factura_cliente">
          <div className='factura_cliente_dato'>
            <p><strong>Fecha:</strong> {data.infoFactura.fechaEmision}</p>
            <p><strong>Cliente:</strong> {data.infoFactura.razonSocialComprador}</p>
          </div>
          <div className='factura_cliente_dato'>
            <p><strong>Dirección:</strong> {data.infoFactura.direccionComprador}</p>
            <p><strong>Cedula:</strong> {data.infoFactura.identificacionComprador}</p>
          </div>
        </div>
        <div className="factura_detalle">
          <table className='factura_detalle_tabla'>
            <thead className=''
              // style={{
              //   backgroundColor: '#292929',
              // }}
            >
              <tr className='factura_detalle_tabla_header'>
                <th className='width-60 textleft padd-l-6'>Descripción</th>
                <th className='pad-2'>Cant.</th>
                <th className='pad-2'>Precio unit.</th>
                <th className='pad-2'>Desc.</th>
                <th className='pad-2'>Total</th>
              </tr>
            </thead>
            <tbody>
              {
                data.detalles.detalle.map((detail, index) => {
                return <tr key={index} className=''>
                  <td className='pad-2 textleft  padd-l-6 '>{detail.descripcion}</td>
                  <td className='pad-2 factura_detalle_tabla_fila_elem'>{detail.cantidad}</td>
                  <td className='pad-2 factura_detalle_tabla_fila_elem'>
                    {
                      detail.impuestos.impuesto[0].tarifa !== "0.00"? "I  ": ""
                    }
                    {detail.precioUnitario}</td>
                  <td className='pad-2 factura_detalle_tabla_fila_elem'>{detail.descuento}</td>
                  <td className='pad-2 factura_detalle_tabla_fila_elem'>{detail.precioTotalSinImpuesto}</td>
                </tr>
                })
              }
            </tbody>
          </table>
          <div className='factura_totalescontainer'>
            <table className='factura_totalescontainer_tabla'>
              <tr className='factura_totalescontainer_tabla_hearder'>
                <th>Total 0%</th>
                <th>Total sin I.V.A.</th>
                <th>I.V.A.</th>
                <th>Total</th>
              </tr>
              <tr className=''>
                <td className='textcenter'>${
                  data.infoFactura.totalConImpuestos.totalImpuesto.length > 1 ?
                  parseFloat(data.infoFactura.totalConImpuestos.totalImpuesto[1].valor).toFixed(2) : 0
                }</td>
                <td className='textcenter'>${data.infoFactura.totalSinImpuestos}</td>
                <td className='textcenter'>${
                  data.infoFactura.totalConImpuestos.totalImpuesto.length >= 1 ?
                  parseFloat(data.infoFactura.totalConImpuestos.totalImpuesto[0].valor).toFixed(2) : 0
                }</td>
                <td className='textcenter'>${data.infoFactura.importeTotal}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    }
    </div>
  );
}

export default App;
