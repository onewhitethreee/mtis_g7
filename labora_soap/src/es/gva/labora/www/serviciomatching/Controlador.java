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
				+ "WHERE m.id_oferta = ? "
				+ "ORDER BY m.puntuacion DESC "
				+ "INNER JOIN usuario u "
				+ "ON m.nifnie = u.id_nie;"
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
			// No se puede hacer matching si la oferta no existe o no tiene ninguna etiqueta
			//
			
			PreparedStatement numero_etiquetas_stmt = conn.prepareStatement(
				"SELECT COUNT(*) AS numero_etiquetas "
				+ "FROM oferta_etiqueta "
				+ "WHERE id_oferta = ?;"
			);
			numero_etiquetas_stmt.setString(1, ejecutarMatching.getId_oferta());
			
			ResultSet numero_etiquetas_query = numero_etiquetas_stmt.executeQuery();
			numero_etiquetas_query.next();
			
			int numero_etiquetas = numero_etiquetas_query.getInt("numero_etiquetas");
			
			if (numero_etiquetas == 0) {
				throw new Exception("No existe tal oferta o la oferta no tiene ninguna etiqueta");
			}
			
			//
			// Tenemos que limpiar resultados de matching previos de esta oferta
			//
			
			PreparedStatement limpiar_datos_stmt = conn.prepareStatement(
				"DELETE FROM matching_resultado "
				+ "WHERE id_oferta = ?;"
			);
			limpiar_datos_stmt.setString(1, ejecutarMatching.getId_oferta());
			
			limpiar_datos_stmt.executeUpdate();
			
			//
			// Esto asigna puntuaciones a cada candidato basado en el solapamiento entre
			// las etiquetas de los certificados del candidato y las etiquetas de la oferta,
			// y luego lo almacena en la tabla
			//
			
			PreparedStatement matching_stmt = conn.prepareStatement(
				"INSERT INTO matching_resultado (id_oferta, nifnie, puntuacion) "
				+ "SELECT "
					+ "?, "
					+ " c.nifnie, "
					+ " (COUNT(DISTINCT oe.id_etiqueta) / ?) * 100 AS puntuacion "
				+ "FROM certificado c "
					+ "INNER JOIN etiqueta e ON c.tipo = e.nombre "
					+ "INNER JOIN oferta_etiqueta oe ON e.id = oe.id_etiqueta "
					+ "INNER JOIN usuario u ON c.nifnie = u.id_nie "
				+ "WHERE oe.id_oferta = ? "
					+ "AND c.estado = 'GENERADO' "
					+ "AND u.tipo = 'DEMANDANTE' "
					+ "AND u.activo = 1 "
				+ "GROUP BY c.nifnie;"
			);
			matching_stmt.setString(1, ejecutarMatching.getId_oferta());
			matching_stmt.setInt(2, numero_etiquetas);
			matching_stmt.setString(3, ejecutarMatching.getId_oferta());
			
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
				conn.close();
			}
			catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
}
