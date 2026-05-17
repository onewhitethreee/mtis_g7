package es.gva.labora.www.serviciomatching;

public class ServicioMatchingSkeleton {
	public ObtenerCandidatosResponse 
	obtenerCandidatos(ObtenerCandidatos obtenerCandidatos) {
		ObtenerCandidatosResponse res = new ObtenerCandidatosResponse();
		res.setOk(true);
		
		try {
			res.setCandidatos(Controlador.obtenerCandidatos(obtenerCandidatos));
		}
		catch (Exception e) {
			res.setOk(false);
			res.setMensaje(e.getMessage());
		}
		
		return res;
	}

	public EjecutarMatchingResponse 
	ejecutarMatching(EjecutarMatching ejecutarMatching) {
		EjecutarMatchingResponse res = new EjecutarMatchingResponse();
		res.setOk(true);
		
		try {
			Controlador.ejecutarMatching(ejecutarMatching);
		}
		catch (Exception e) {
			res.setOk(false);
			res.setMensaje(e.getMessage());
		}
		
		return res;
	}
}
