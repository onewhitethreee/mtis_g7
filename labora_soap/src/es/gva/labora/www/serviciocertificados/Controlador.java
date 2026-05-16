package es.gva.labora.www.serviciocertificados;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class Controlador {
	private static final String DRIVER   = "com.mysql.cj.jdbc.Driver";
	private static final String URL      = "jdbc:mysql://127.0.0.1:3307/labora";
	private static final String USER     = "root";
	private static final String PASSWORD = "root";
	
	private static Connection 
	getConnection() throws Exception {
		try {
			Class.forName(DRIVER);
			return DriverManager.getConnection(URL, USER, PASSWORD);
		}
		catch (SQLException e) {
			e.printStackTrace();
			throw new Exception("Error interno del servidor");
		}
		catch (ClassNotFoundException e) {
			e.printStackTrace();
			throw new Exception("Error interno del servidor");
		}
	}
	
	public static void 
	solicitarCertificado(SolicitarCertificado solicitarCertificado) throws Exception {
		Connection conn = Controlador.getConnection();
	
		try {
			PreparedStatement stmt = conn.prepareStatement(
				"INSERT INTO certificado (nifnie, tipo, motivo, estado) "
				+ "SELECT u.id_nie, ?, ?, 'PENDIENTE' "
				+ "FROM usuarios u "
				+ "WHERE u.id_nie = ? AND u.tipo = 'DEMANDANTE' AND u.activo = 1;"
			);
			stmt.setString(1, solicitarCertificado.getTipo());
			stmt.setString(2, solicitarCertificado.getMotivo());
			stmt.setString(3, solicitarCertificado.getNifnie());
				
			int affected = stmt.executeUpdate();
			if (affected == 0) {
				throw new Exception("No existe un demandante activo con este NIF o NIE");
			}
		}
		catch (SQLException e) {
			e.printStackTrace();
			throw new Exception("Error interno del servidor");
		}
		finally {
			try {
				conn.close();
			}
			catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	public static void
	marcarCertificado(MarcarCertificado marcarCertificado) throws Exception {
		Connection conn = Controlador.getConnection();
		
		try {
			PreparedStatement update_stmt = conn.prepareStatement(
				"UPDATE certificado "
				+ "SET estado = ?, observaciones = ? "
				+ "WHERE id = ?;"
			);
			update_stmt.setString(1, marcarCertificado.getEstado());
			update_stmt.setString(2, marcarCertificado.getObservaciones());
			update_stmt.setInt(3, marcarCertificado.getId());
				
			int affected = update_stmt.executeUpdate();
			if (affected == 0) {
				throw new Exception("No existe este certificado");
			}
		}
		catch (SQLException e) {
			e.printStackTrace();
			throw new Exception("Error interno del servidor");
		}
		finally {
			try {
				conn.close();
			}
			catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	
	public static Certificado[]
	listarCertificados(ListarCertificados listarCertificados) throws Exception {
		Connection conn = Controlador.getConnection();
		
		try {
			PreparedStatement stmt; 
			
			if (listarCertificados.getNifnie() == null) {
				stmt = conn.prepareStatement("SELECT * FROM certificado WHERE nifnie = ?;");
				stmt.setString(1, listarCertificados.getNifnie());		
			}
			else {
				stmt = conn.prepareStatement("SELECT * from certificado;");
			}
		
			List<Certificado> list = new ArrayList<>();
			
			ResultSet result = stmt.executeQuery();
			while (result.next()) {
				Certificado certificado = new Certificado();
				certificado.setId(result.getInt("id"));
				certificado.setNifnie(result.getString("nifnie"));
				certificado.setTipo(result.getString("tipo"));
				certificado.setMotivo(result.getString("motivo"));
				certificado.setEstado(result.getString("estado"));
				certificado.setFecha_emision(result.getDate("fecha_emision").toString());
				certificado.setCodigo_verificacion(result.getString("codigo_verificacion"));
				certificado.setObservaciones(result.getString("observaciones"));
				
				list.add(certificado);
			}
			
			Certificado[] arr = new Certificado[list.size()];
			for (int i = 0; i < list.size(); i++) {
				arr[i] = list.get(i);
			}
			
			return arr;
		}
		catch (SQLException e) {
			e.printStackTrace();
			throw new Exception("Error interno del servidor");
		}
		finally {
			try {
				conn.close();
			}
			catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
}
