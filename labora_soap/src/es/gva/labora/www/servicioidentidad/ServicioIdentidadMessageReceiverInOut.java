
/**
 * ServicioIdentidadMessageReceiverInOut.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis2 version: 1.6.3  Built on : Jun 27, 2015 (11:17:49 BST)
 */
        package es.gva.labora.www.servicioidentidad;

        /**
        *  ServicioIdentidadMessageReceiverInOut message receiver
        */

        public class ServicioIdentidadMessageReceiverInOut extends org.apache.axis2.receivers.AbstractInOutMessageReceiver{


        public void invokeBusinessLogic(org.apache.axis2.context.MessageContext msgContext, org.apache.axis2.context.MessageContext newMsgContext)
        throws org.apache.axis2.AxisFault{

        try {

        // get the implementation class for the Web Service
        Object obj = getTheImplementationObject(msgContext);

        ServicioIdentidadSkeleton skel = (ServicioIdentidadSkeleton)obj;
        //Out Envelop
        org.apache.axiom.soap.SOAPEnvelope envelope = null;
        //Find the axisOperation that has been set by the Dispatch phase.
        org.apache.axis2.description.AxisOperation op = msgContext.getOperationContext().getAxisOperation();
        if (op == null) {
        throw new org.apache.axis2.AxisFault("Operation is not located, if this is doclit style the SOAP-ACTION should specified via the SOAP Action to use the RawXMLProvider");
        }

        java.lang.String methodName;
        if((op.getName() != null) && ((methodName = org.apache.axis2.util.JavaUtils.xmlNameToJavaIdentifier(op.getName().getLocalPart())) != null)){


        

            if("verificarPrivilegios".equals(methodName)){
                
                es.gva.labora.www.servicioidentidad.VerificarPrivilegiosResponse verificarPrivilegiosResponse13 = null;
	                        es.gva.labora.www.servicioidentidad.VerificarPrivilegios wrappedParam =
                                                             (es.gva.labora.www.servicioidentidad.VerificarPrivilegios)fromOM(
                                    msgContext.getEnvelope().getBody().getFirstElement(),
                                    es.gva.labora.www.servicioidentidad.VerificarPrivilegios.class,
                                    getEnvelopeNamespaces(msgContext.getEnvelope()));
                                                
                                               verificarPrivilegiosResponse13 =
                                                   
                                                   
                                                         skel.verificarPrivilegios(wrappedParam)
                                                    ;
                                            
                                        envelope = toEnvelope(getSOAPFactory(msgContext), verificarPrivilegiosResponse13, false, new javax.xml.namespace.QName("http://www.labora.gva.es/ServicioIdentidad/",
                                                    "verificarPrivilegios"));
                                    } else 

            if("autenticarUsuario".equals(methodName)){
                
                es.gva.labora.www.servicioidentidad.AutenticarUsuarioResponse autenticarUsuarioResponse15 = null;
	                        es.gva.labora.www.servicioidentidad.AutenticarUsuario wrappedParam =
                                                             (es.gva.labora.www.servicioidentidad.AutenticarUsuario)fromOM(
                                    msgContext.getEnvelope().getBody().getFirstElement(),
                                    es.gva.labora.www.servicioidentidad.AutenticarUsuario.class,
                                    getEnvelopeNamespaces(msgContext.getEnvelope()));
                                                
                                               autenticarUsuarioResponse15 =
                                                   
                                                   
                                                         skel.autenticarUsuario(wrappedParam)
                                                    ;
                                            
                                        envelope = toEnvelope(getSOAPFactory(msgContext), autenticarUsuarioResponse15, false, new javax.xml.namespace.QName("http://www.labora.gva.es/ServicioIdentidad/",
                                                    "autenticarUsuario"));
                                    } else 

            if("crearContrasena".equals(methodName)){
                
                es.gva.labora.www.servicioidentidad.CrearContrasenaResponse crearContrasenaResponse17 = null;
	                        es.gva.labora.www.servicioidentidad.CrearContrasena wrappedParam =
                                                             (es.gva.labora.www.servicioidentidad.CrearContrasena)fromOM(
                                    msgContext.getEnvelope().getBody().getFirstElement(),
                                    es.gva.labora.www.servicioidentidad.CrearContrasena.class,
                                    getEnvelopeNamespaces(msgContext.getEnvelope()));
                                                
                                               crearContrasenaResponse17 =
                                                   
                                                   
                                                         skel.crearContrasena(wrappedParam)
                                                    ;
                                            
                                        envelope = toEnvelope(getSOAPFactory(msgContext), crearContrasenaResponse17, false, new javax.xml.namespace.QName("http://www.labora.gva.es/ServicioIdentidad/",
                                                    "crearContrasena"));
                                    
            } else {
              throw new java.lang.RuntimeException("method not found");
            }
        

        newMsgContext.setEnvelope(envelope);
        }
        }
        catch (java.lang.Exception e) {
        throw org.apache.axis2.AxisFault.makeFault(e);
        }
        }
        
        //
            private  org.apache.axiom.om.OMElement  toOM(es.gva.labora.www.servicioidentidad.VerificarPrivilegios param, boolean optimizeContent)
            throws org.apache.axis2.AxisFault {

            
                        try{
                             return param.getOMElement(es.gva.labora.www.servicioidentidad.VerificarPrivilegios.MY_QNAME,
                                          org.apache.axiom.om.OMAbstractFactory.getOMFactory());
                        } catch(org.apache.axis2.databinding.ADBException e){
                            throw org.apache.axis2.AxisFault.makeFault(e);
                        }
                    

            }
        
            private  org.apache.axiom.om.OMElement  toOM(es.gva.labora.www.servicioidentidad.VerificarPrivilegiosResponse param, boolean optimizeContent)
            throws org.apache.axis2.AxisFault {

            
                        try{
                             return param.getOMElement(es.gva.labora.www.servicioidentidad.VerificarPrivilegiosResponse.MY_QNAME,
                                          org.apache.axiom.om.OMAbstractFactory.getOMFactory());
                        } catch(org.apache.axis2.databinding.ADBException e){
                            throw org.apache.axis2.AxisFault.makeFault(e);
                        }
                    

            }
        
            private  org.apache.axiom.om.OMElement  toOM(es.gva.labora.www.servicioidentidad.AutenticarUsuario param, boolean optimizeContent)
            throws org.apache.axis2.AxisFault {

            
                        try{
                             return param.getOMElement(es.gva.labora.www.servicioidentidad.AutenticarUsuario.MY_QNAME,
                                          org.apache.axiom.om.OMAbstractFactory.getOMFactory());
                        } catch(org.apache.axis2.databinding.ADBException e){
                            throw org.apache.axis2.AxisFault.makeFault(e);
                        }
                    

            }
        
            private  org.apache.axiom.om.OMElement  toOM(es.gva.labora.www.servicioidentidad.AutenticarUsuarioResponse param, boolean optimizeContent)
            throws org.apache.axis2.AxisFault {

            
                        try{
                             return param.getOMElement(es.gva.labora.www.servicioidentidad.AutenticarUsuarioResponse.MY_QNAME,
                                          org.apache.axiom.om.OMAbstractFactory.getOMFactory());
                        } catch(org.apache.axis2.databinding.ADBException e){
                            throw org.apache.axis2.AxisFault.makeFault(e);
                        }
                    

            }
        
            private  org.apache.axiom.om.OMElement  toOM(es.gva.labora.www.servicioidentidad.CrearContrasena param, boolean optimizeContent)
            throws org.apache.axis2.AxisFault {

            
                        try{
                             return param.getOMElement(es.gva.labora.www.servicioidentidad.CrearContrasena.MY_QNAME,
                                          org.apache.axiom.om.OMAbstractFactory.getOMFactory());
                        } catch(org.apache.axis2.databinding.ADBException e){
                            throw org.apache.axis2.AxisFault.makeFault(e);
                        }
                    

            }
        
            private  org.apache.axiom.om.OMElement  toOM(es.gva.labora.www.servicioidentidad.CrearContrasenaResponse param, boolean optimizeContent)
            throws org.apache.axis2.AxisFault {

            
                        try{
                             return param.getOMElement(es.gva.labora.www.servicioidentidad.CrearContrasenaResponse.MY_QNAME,
                                          org.apache.axiom.om.OMAbstractFactory.getOMFactory());
                        } catch(org.apache.axis2.databinding.ADBException e){
                            throw org.apache.axis2.AxisFault.makeFault(e);
                        }
                    

            }
        
                    private  org.apache.axiom.soap.SOAPEnvelope toEnvelope(org.apache.axiom.soap.SOAPFactory factory, es.gva.labora.www.servicioidentidad.VerificarPrivilegiosResponse param, boolean optimizeContent, javax.xml.namespace.QName methodQName)
                        throws org.apache.axis2.AxisFault{
                      try{
                          org.apache.axiom.soap.SOAPEnvelope emptyEnvelope = factory.getDefaultEnvelope();
                           
                                    emptyEnvelope.getBody().addChild(param.getOMElement(es.gva.labora.www.servicioidentidad.VerificarPrivilegiosResponse.MY_QNAME,factory));
                                

                         return emptyEnvelope;
                    } catch(org.apache.axis2.databinding.ADBException e){
                        throw org.apache.axis2.AxisFault.makeFault(e);
                    }
                    }
                    
                         private es.gva.labora.www.servicioidentidad.VerificarPrivilegiosResponse wrapVerificarPrivilegios(){
                                es.gva.labora.www.servicioidentidad.VerificarPrivilegiosResponse wrappedElement = new es.gva.labora.www.servicioidentidad.VerificarPrivilegiosResponse();
                                return wrappedElement;
                         }
                    
                    private  org.apache.axiom.soap.SOAPEnvelope toEnvelope(org.apache.axiom.soap.SOAPFactory factory, es.gva.labora.www.servicioidentidad.AutenticarUsuarioResponse param, boolean optimizeContent, javax.xml.namespace.QName methodQName)
                        throws org.apache.axis2.AxisFault{
                      try{
                          org.apache.axiom.soap.SOAPEnvelope emptyEnvelope = factory.getDefaultEnvelope();
                           
                                    emptyEnvelope.getBody().addChild(param.getOMElement(es.gva.labora.www.servicioidentidad.AutenticarUsuarioResponse.MY_QNAME,factory));
                                

                         return emptyEnvelope;
                    } catch(org.apache.axis2.databinding.ADBException e){
                        throw org.apache.axis2.AxisFault.makeFault(e);
                    }
                    }
                    
                         private es.gva.labora.www.servicioidentidad.AutenticarUsuarioResponse wrapAutenticarUsuario(){
                                es.gva.labora.www.servicioidentidad.AutenticarUsuarioResponse wrappedElement = new es.gva.labora.www.servicioidentidad.AutenticarUsuarioResponse();
                                return wrappedElement;
                         }
                    
                    private  org.apache.axiom.soap.SOAPEnvelope toEnvelope(org.apache.axiom.soap.SOAPFactory factory, es.gva.labora.www.servicioidentidad.CrearContrasenaResponse param, boolean optimizeContent, javax.xml.namespace.QName methodQName)
                        throws org.apache.axis2.AxisFault{
                      try{
                          org.apache.axiom.soap.SOAPEnvelope emptyEnvelope = factory.getDefaultEnvelope();
                           
                                    emptyEnvelope.getBody().addChild(param.getOMElement(es.gva.labora.www.servicioidentidad.CrearContrasenaResponse.MY_QNAME,factory));
                                

                         return emptyEnvelope;
                    } catch(org.apache.axis2.databinding.ADBException e){
                        throw org.apache.axis2.AxisFault.makeFault(e);
                    }
                    }
                    
                         private es.gva.labora.www.servicioidentidad.CrearContrasenaResponse wrapCrearContrasena(){
                                es.gva.labora.www.servicioidentidad.CrearContrasenaResponse wrappedElement = new es.gva.labora.www.servicioidentidad.CrearContrasenaResponse();
                                return wrappedElement;
                         }
                    


        /**
        *  get the default envelope
        */
        private org.apache.axiom.soap.SOAPEnvelope toEnvelope(org.apache.axiom.soap.SOAPFactory factory){
        return factory.getDefaultEnvelope();
        }


        private  java.lang.Object fromOM(
        org.apache.axiom.om.OMElement param,
        java.lang.Class type,
        java.util.Map extraNamespaces) throws org.apache.axis2.AxisFault{

        try {
        
                if (es.gva.labora.www.servicioidentidad.AutenticarUsuario.class.equals(type)){
                
                        return es.gva.labora.www.servicioidentidad.AutenticarUsuario.Factory.parse(param.getXMLStreamReaderWithoutCaching());
                    

                }
            
                if (es.gva.labora.www.servicioidentidad.AutenticarUsuarioResponse.class.equals(type)){
                
                        return es.gva.labora.www.servicioidentidad.AutenticarUsuarioResponse.Factory.parse(param.getXMLStreamReaderWithoutCaching());
                    

                }
            
                if (es.gva.labora.www.servicioidentidad.CrearContrasena.class.equals(type)){
                
                        return es.gva.labora.www.servicioidentidad.CrearContrasena.Factory.parse(param.getXMLStreamReaderWithoutCaching());
                    

                }
            
                if (es.gva.labora.www.servicioidentidad.CrearContrasenaResponse.class.equals(type)){
                
                        return es.gva.labora.www.servicioidentidad.CrearContrasenaResponse.Factory.parse(param.getXMLStreamReaderWithoutCaching());
                    

                }
            
                if (es.gva.labora.www.servicioidentidad.VerificarPrivilegios.class.equals(type)){
                
                        return es.gva.labora.www.servicioidentidad.VerificarPrivilegios.Factory.parse(param.getXMLStreamReaderWithoutCaching());
                    

                }
            
                if (es.gva.labora.www.servicioidentidad.VerificarPrivilegiosResponse.class.equals(type)){
                
                        return es.gva.labora.www.servicioidentidad.VerificarPrivilegiosResponse.Factory.parse(param.getXMLStreamReaderWithoutCaching());
                    

                }
            
        } catch (java.lang.Exception e) {
        throw org.apache.axis2.AxisFault.makeFault(e);
        }
           return null;
        }



    

        /**
        *  A utility method that copies the namepaces from the SOAPEnvelope
        */
        private java.util.Map getEnvelopeNamespaces(org.apache.axiom.soap.SOAPEnvelope env){
        java.util.Map returnMap = new java.util.HashMap();
        java.util.Iterator namespaceIterator = env.getAllDeclaredNamespaces();
        while (namespaceIterator.hasNext()) {
        org.apache.axiom.om.OMNamespace ns = (org.apache.axiom.om.OMNamespace) namespaceIterator.next();
        returnMap.put(ns.getPrefix(),ns.getNamespaceURI());
        }
        return returnMap;
        }

        private org.apache.axis2.AxisFault createAxisFault(java.lang.Exception e) {
        org.apache.axis2.AxisFault f;
        Throwable cause = e.getCause();
        if (cause != null) {
            f = new org.apache.axis2.AxisFault(e.getMessage(), cause);
        } else {
            f = new org.apache.axis2.AxisFault(e.getMessage());
        }

        return f;
    }

        }//end of class
    