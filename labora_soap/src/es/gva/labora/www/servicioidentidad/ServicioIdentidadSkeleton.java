package es.gva.labora.www.servicioidentidad;

public class ServicioIdentidadSkeleton {
	public VerificarPrivilegiosResponse 
	verificarPrivilegios(VerificarPrivilegios verificarPrivilegios) {
		VerificarPrivilegiosResponse res = new VerificarPrivilegiosResponse();
		res.setOk(true);
		
		try {
			Controlador.verificarPrivilegios(verificarPrivilegios);
		}
		catch (Exception e) {
			res.setOk(false);
			res.setMensaje(e.getMessage());
		}
		
		return res;
	}

	public AutenticarUsuarioResponse 
	autenticarUsuario(AutenticarUsuario autenticarUsuario) {
		AutenticarUsuarioResponse res = new AutenticarUsuarioResponse();
		res.setOk(true);
		
		try {
			Controlador.autenticarUsuario(autenticarUsuario);
		}
		catch (Exception e) {
			res.setOk(false);
			res.setMensaje(e.getMessage());
		}
		
		return res;
	}

	public CrearContrasenaResponse 
	crearContrasena(CrearContrasena crearContrasena) {
		CrearContrasenaResponse res = new CrearContrasenaResponse();
		res.setOk(true);
		
		try {
			Controlador.crearContrasena(crearContrasena);
		}
		catch (Exception e) {
			res.setOk(false);
			res.setMensaje(e.getMessage());
		}
		
		return res;
	}

}
