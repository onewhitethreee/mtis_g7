package es.gva.labora.www.servicioidentidad;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

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
	verificarPrivilegios(VerificarPrivilegios verificarPrivilegios) throws Exception {
		Connection conn = Controlador.getConnection();
		
		try {
			PreparedStatement stmt = conn.prepareStatement(
				"SELECT * FROM usuario "
				+ "WHERE id_nie = ? "
				+ "AND activo = 1 "
				+ "AND tipo = ? "
				+ "LIMIT 1;"
			);
			stmt.setString(1, verificarPrivilegios.getNifnie());
			stmt.setString(2, verificarPrivilegios.getNivel());
				
			ResultSet result = stmt.executeQuery();
			if (!result.next()) {
				throw new Exception("No existe, no está activo o no tiene privilegios adecuados");
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
	autenticarUsuario(AutenticarUsuario autenticarUsuario) throws Exception {
		Connection conn = Controlador.getConnection();
		
		try {
			PreparedStatement stmt = conn.prepareStatement(
				"SELECT * FROM usuario "
				+ "WHERE id_nie = ? "
				+ "AND activo = 1 "
				+ "AND contrasena_hash = ? "
				+ "LIMIT 1;"
			);
			stmt.setString(1, autenticarUsuario.getNifnie());
			stmt.setString(2, autenticarUsuario.getContrasena());
				
			ResultSet result = stmt.executeQuery();
			if (!result.next()) {
				throw new Exception("No existe, no está activo o la contraseña es incorrecta");
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
	crearContrasena(CrearContrasena crearContrasena) throws Exception {
		Connection conn = Controlador.getConnection();
		
		try {
			PreparedStatement stmt = conn.prepareStatement(
				"UPDATE usuario "
				+ "SET contrasena_hash = ? "
				+ "WHERE id_nie = ? "
				+ "LIMIT 1;"
			);
			stmt.setString(1, crearContrasena.getContrasena());
			stmt.setString(2, crearContrasena.getNifnie());
				
			int affected = stmt.executeUpdate();
			if (affected == 0) {
				throw new Exception("No existe tal usuario");
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
}
