/* eslint-disable jsx-a11y/alt-text */
import './App.css';
import {useState, useEffect} from 'react';
import { decode } from 'js-base64';

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
    // console.log(window.location.pathname.split('/rides/')[1])
    if (window.location.pathname.split('/rides/')[1]) {
      console.log('entro', JSON.parse(decode(window.location.pathname.split("/rides/")[1])))
      setData(JSON.parse(decode(window.location.pathname.split("/rides/")[1])))
    }
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
                  <td className='pad-2 factura_detalle_tabla_fila_elem'>{detail.precioUnitario}</td>
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
                <th>Total sin I.V.A.</th>
                <th>I.V.A.</th>
                <th>Total con I.V.A.</th>
              </tr>
              <tr className=''>
                <td className='textcenter'>${data.infoFactura.totalSinImpuestos}</td>
                <td className='textcenter'>12.00%</td>
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
