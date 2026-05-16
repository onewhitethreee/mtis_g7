package es.gva.labora.www.serviciocertificados;

public class ServicioCertificadosSkeleton {
	public SolicitarCertificadoResponse 
	solicitarCertificado(SolicitarCertificado solicitarCertificado) {
		SolicitarCertificadoResponse res = new SolicitarCertificadoResponse();
		res.setOk(true);
		
		try {
			Controlador.solicitarCertificado(solicitarCertificado);
		}
		catch (Exception e) {
			res.setOk(false);
			res.setMensaje(e.getMessage());
		}
		
		return res;
	}

	public MarcarCertificadoResponse 
	marcarCertificado(MarcarCertificado marcarCertificado) {
		MarcarCertificadoResponse res = new MarcarCertificadoResponse();
		res.setOk(true);
		
		try {
			Controlador.marcarCertificado(marcarCertificado);
		}
		catch (Exception e) {
			res.setOk(false);
			res.setMensaje(e.getMessage());
		}
		
		return res;
	}
	
	public ListarCertificadosResponse
	listarCertificados(ListarCertificados listarCertificados) {
		ListarCertificadosResponse res = new ListarCertificadosResponse();
		res.setOk(true);
		
		try {
			res.setCertificados(Controlador.listarCertificados(listarCertificados));
		}
		catch (Exception e) {
			res.setOk(false);
			res.setMensaje(e.getMessage());
		}
		
		return res;
	}
}
