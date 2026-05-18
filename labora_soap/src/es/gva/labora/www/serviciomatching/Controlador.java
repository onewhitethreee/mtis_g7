package es.gva.labora.www.serviciomatching;

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
	
	/**
	 *
	 * Si llamas a esto con un ResultSet que no tenga las columnas indicadas, MUERES
	 *
	 */
	private static CandidatoMatching
	mapearCandidato(ResultSet result) throws SQLException {
		CandidatoMatching candidato = new CandidatoMatching();
		
		candidato.setNifnie(result.getString("nifnie"));
		candidato.setNombre(result.getString("nombre"));
		candidato.setApellidos(result.getString("apellidos"));
		candidato.setEmail(result.getString("email"));
		candidato.setPuntuacion(result.getBigDecimal("puntuacion"));
		
		return candidato;
	}
	
	public static CandidatoMatching[]
	obtenerCandidatos(ObtenerCandidatos obtenerCandidatos) throws Exception {
		Connection conn = Controlador.getConnection();
		
		try {
			PreparedStatement stmt = conn.prepareStatement(
				"SELECT m.nifnie, u.nombre, u.apellidos, u.email, m.puntuacion "
				+ "FROM matching_resultado m "
				+ "INNER JOIN usuario u ON m.nifnie = u.id_nie "
				+ "WHERE m.id_oferta = ? "
				+ "ORDER BY m.puntuacion DESC ;"
			);
			stmt.setString(1, obtenerCandidatos.getId_oferta());
		
			List<CandidatoMatching> list = new ArrayList<>();
			
			ResultSet result = stmt.executeQuery();
			while (result.next()) {
				list.add(mapearCandidato(result));
			}
			
			CandidatoMatching[] arr = new CandidatoMatching[list.size()];
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
	
	public static void
	ejecutarMatching(EjecutarMatching ejecutarMatching) throws Exception {
		Connection conn = Controlador.getConnection();
		conn.setAutoCommit(false);
		
		try {
			//
			// No se puede hacer matching si la oferta no existe
			//
			
			PreparedStatement oferta_query_stmt = conn.prepareStatement(
				"SELECT * FROM oferta WHERE id = ?;"
			);
			oferta_query_stmt.setString(1, ejecutarMatching.getId_oferta());
			
			ResultSet oferta_query_result = oferta_query_stmt.executeQuery();

			if (!oferta_query_result.next()) {
				throw new Exception("No existe tal oferta");
			}
			
			//
			// Tenemos que limpiar resultados de matching previos de esta oferta
			//
			
			PreparedStatement limpiar_datos_stmt = conn.prepareStatement(
				"DELETE FROM matching_resultado WHERE id_oferta = ?;"
			);
			limpiar_datos_stmt.setString(1, ejecutarMatching.getId_oferta());
			
			limpiar_datos_stmt.executeUpdate();
			
			//
			// Esto asigna puntuaciones a cada candidato basado en el numero
			// de certificados del candidato
			//
			
			PreparedStatement matching_stmt = conn.prepareStatement(
				"INSERT INTO matching_resultado (id_oferta, nifnie, puntuacion) "
				+ "SELECT ?, u.id_nie, COUNT(c.id) AS puntuacion "
				+ "FROM usuario u "
				+ "INNER JOIN certificado c ON u.id_nie = c.nifnie "
				+ "WHERE u.tipo = 'DEMANDANTE' "
					+ "AND u.activo = 1 "
					+ "AND c.estado = 'GENERADO' "
				+ "GROUP BY u.id_nie;"
			);
			matching_stmt.setString(1, ejecutarMatching.getId_oferta());
			matching_stmt.executeUpdate();
			
			conn.commit();
		}
		catch (SQLException e) {
			conn.rollback();
			e.printStackTrace();
			throw new Exception("Error interno del servidor");
		}
		finally {
			try {
				conn.setAutoCommit(true);
				conn.close();
			}
			catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
}
