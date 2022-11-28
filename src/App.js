import './App.scss';
import {useState, useEffect} from 'react';
import { encode, decode } from 'js-base64';

function App() {
 
  const [data, setData] = useState({
    
  });
  const [loader, setLoader] = useState(true);
  const link = "https://codigomarret.online/rides?ewogICAgImluZm9UcmlidXRhcmlhIjogewogICAgICAgICJhbWJpZW50ZSI6ICIxIiwKICAgICAgICAidGlwb0VtaXNpb24iOiAiMSIsCiAgICAgICAgInJhem9uU29jaWFsIjogIkRhcmlvIEphdmllciBNYXJyZXQgTWVkcmFuZGEiLAogICAgICAgICJub21icmVDb21lcmNpYWwiOiAiRGFyaW8gSmF2aWVyIE1hcnJldCBNZWRyYW5kYSIsCiAgICAgICAgInJ1YyI6ICIwOTI3MTc3MzQ1MDAxIiwKICAgICAgICAiY2xhdmVBY2Nlc28iOiAiMTAxMDIwMjIwMTA5MjcxNzczNDUwMDExMDAxMDAxMDAwMDAwMDAxMTIzNDU2NzgxMyIsCiAgICAgICAgImNvZERvYyI6ICIwMSIsCiAgICAgICAgImVzdGFiIjogIjAwMSIsCiAgICAgICAgInB0b0VtaSI6ICIwMDEiLAogICAgICAgICJzZWN1ZW5jaWFsIjogIjAwMDAwMDAwMSIsCiAgICAgICAgImRpck1hdHJpeiI6ICJTYWxpbmFzIgogICAgfSwKICAgICJpbmZvRmFjdHVyYSI6IHsKICAgICAgICAiZmVjaGFFbWlzaW9uIjogIjEwLzEwLzIwMjIiLAogICAgICAgICJkaXJFc3RhYmxlY2ltaWVudG8iOiAiTWFsZWNvbiBkZSBTYWxpbmFzIiwKICAgICAgICAib2JsaWdhZG9Db250YWJpbGlkYWQiOiAiTk8iLAogICAgICAgICJ0aXBvSWRlbnRpZmljYWNpb25Db21wcmFkb3IiOiAiMDUiLAogICAgICAgICJyYXpvblNvY2lhbENvbXByYWRvciI6ICJEYXJpbyBKYXZpZXIgTWFycmV0IE1lZHJhbmRhIiwKICAgICAgICAiaWRlbnRpZmljYWNpb25Db21wcmFkb3IiOiAiMDkyNzE3NzM0NSIsCiAgICAgICAgImRpcmVjY2lvbkNvbXByYWRvciI6IlNhbGluYXMgc2FudGEgZWxlbmEiLAogICAgICAgICJ0b3RhbFNpbkltcHVlc3RvcyI6ICIxMi4wMCIsCiAgICAgICAgInRvdGFsRGVzY3VlbnRvIjogIjAuMDAiLAogICAgICAgICJ0b3RhbENvbkltcHVlc3RvcyI6IHsKICAgICAgICAgICAgInRvdGFsSW1wdWVzdG8iOiBbCiAgICAgICAgICAgICAgICB7CiAgICAgICAgICAgICAgICAgICAgImNvZGlnbyI6ICIyIiwKICAgICAgICAgICAgICAgICAgICAiY29kaWdvUG9yY2VudGFqZSI6ICIyIiwKICAgICAgICAgICAgICAgICAgICAiYmFzZUltcG9uaWJsZSI6ICIxMi4wMCIsCiAgICAgICAgICAgICAgICAgICAgInZhbG9yIjogIjEuNDQiCiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIF0KICAgICAgICB9LAogICAgICAgICJwcm9waW5hIjoiMC4wMCIsCiAgICAgICAgImltcG9ydGVUb3RhbCI6ICIxMy40NCIsCiAgICAgICAgIm1vbmVkYSI6ICJET0xBUiIKICAgIH0sCiAgICAiZGV0YWxsZXMiOiB7CiAgICAgICAgImRldGFsbGUiOiBbCiAgICAgICAgICAgIHsKICAgICAgICAgICAgICAgICJjb2RpZ29QcmluY2lwYWwiOiAiMTI1QkpDLTAxIiwKICAgICAgICAgICAgICAgICJjb2RpZ29BdXhpbGlhciI6ICIxMjM0RDU2Nzg5LUEiLAogICAgICAgICAgICAgICAgImRlc2NyaXBjaW9uIjogIk1hcmluZXJvIiwKICAgICAgICAgICAgICAgICJjYW50aWRhZCI6ICIxIiwKICAgICAgICAgICAgICAgICJwcmVjaW9Vbml0YXJpbyI6ICIxMi4wMCIsCiAgICAgICAgICAgICAgICAiZGVzY3VlbnRvIjogIjAuMDAiLAogICAgICAgICAgICAgICAgInByZWNpb1RvdGFsU2luSW1wdWVzdG8iOiAiMTIuMDAiLAogICAgICAgICAgICAgICAgImltcHVlc3RvcyI6IHsKICAgICAgICAgICAgICAgICAgICAiaW1wdWVzdG8iOiBbCiAgICAgICAgICAgICAgICAgICAgICAgIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICJjb2RpZ28iOiAiMiIsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAiY29kaWdvUG9yY2VudGFqZSI6ICIyIiwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICJ0YXJpZmEiOiAiMTIuMDAiLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgImJhc2VJbXBvbmlibGUiOiAiMTIuMDAiLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgInZhbG9yIjogIjEuNDQiCiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBdCiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICBdCiAgICB9LAogICAgImNsYXZlQWNjZXNvIjoiMTAxMDIwMjIwMTA5MjcxNzczNDUwMDExMDAxMDAxMDAwMDAwMDAxMTIzNDU2NzgxMyIsCiAgICAibnVtZXJvX3NlY3VlbmNpYWwiOiIwMDAwMDA0MDAiLAogICAgImxvZ29fZW1wcmVzYSI6Imh0dHBzOi8vY29kaWdvbWFycmV0Lm9ubGluZS9zdG9yZS9pbWcvbHV2bm92ZW4ucG5nIgp9"
  useEffect(() => {
    // PRUEBAS
    const query = link.split('?')[1]
    if (query) {
      setData(JSON.parse(decode(query)))
    }
    // PRODUCCION
    // if (window.location.pathname.split('?')[1]) {
      //   setData(JSON.parse(decode(window.location.pathname.split('?')[1])))
    // }
    setLoader(false)
  }, []);
  return (
    <div className="container">
      {loader ? <div></div>:
      <div className="factura">
        <div className="factura_empresa">
          <div className='factura_empresa_datos'>
            <img className='factura_empresa_datos_logo' src={data.logo_empresa} />
            <div className='factura_empresa_datos_info'>
              <p className='bold'>{data.infoTributaria.nombreComercial}</p>
              <p>{data.infoTributaria.dirMatriz}</p>
              <p>{data.infoFactura.obligadoContabilidad === 'SI' ? 'Obligado a llevar contabilidad' : 'No obligado a llevar contabilidad'}</p>
            </div>
          </div>
          <div className='bg-gray-100 factura_empresa_infotrib'>
              <p className='bold'>R.U.C.: {data.infoTributaria.ruc}</p>
              <p>Factura - {data.infoTributaria.estab}-{data.infoTributaria.ptoEmi}-{data.infoTributaria.secuencial}</p>
              <div>
                <p className='bold'>Clave de acceso </p>
                <p>{data.infoTributaria.claveAcceso}</p>
              </div>
              <p className='bold'>Ambiente: {data.infoTributaria.ambiente === '1' ? 'PRUEBA' : 'PRODUCCION'}</p>
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
            <thead className=''>
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
                <td className='textcenter'>{data.infoFactura.totalSinImpuestos}</td>
                <td className='textcenter'>12.00%</td>
                <td className='textcenter'>{data.infoFactura.importeTotal}</td>
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
