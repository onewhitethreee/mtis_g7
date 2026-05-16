
/**
 * ServicioCertificadosMessageReceiverInOut.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis2 version: 1.6.3  Built on : Jun 27, 2015 (11:17:49 BST)
 */
        package es.gva.labora.www.serviciocertificados;

        /**
        *  ServicioCertificadosMessageReceiverInOut message receiver
        */

        public class ServicioCertificadosMessageReceiverInOut extends org.apache.axis2.receivers.AbstractInOutMessageReceiver{


        public void invokeBusinessLogic(org.apache.axis2.context.MessageContext msgContext, org.apache.axis2.context.MessageContext newMsgContext)
        throws org.apache.axis2.AxisFault{

        try {

        // get the implementation class for the Web Service
        Object obj = getTheImplementationObject(msgContext);

        ServicioCertificadosSkeleton skel = (ServicioCertificadosSkeleton)obj;
        //Out Envelop
        org.apache.axiom.soap.SOAPEnvelope envelope = null;
        //Find the axisOperation that has been set by the Dispatch phase.
        org.apache.axis2.description.AxisOperation op = msgContext.getOperationContext().getAxisOperation();
        if (op == null) {
        throw new org.apache.axis2.AxisFault("Operation is not located, if this is doclit style the SOAP-ACTION should specified via the SOAP Action to use the RawXMLProvider");
        }

        java.lang.String methodName;
        if((op.getName() != null) && ((methodName = org.apache.axis2.util.JavaUtils.xmlNameToJavaIdentifier(op.getName().getLocalPart())) != null)){


        

            if("solicitarCertificado".equals(methodName)){
                
                es.gva.labora.www.serviciocertificados.SolicitarCertificadoResponse solicitarCertificadoResponse13 = null;
	                        es.gva.labora.www.serviciocertificados.SolicitarCertificado wrappedParam =
                                                             (es.gva.labora.www.serviciocertificados.SolicitarCertificado)fromOM(
                                    msgContext.getEnvelope().getBody().getFirstElement(),
                                    es.gva.labora.www.serviciocertificados.SolicitarCertificado.class,
                                    getEnvelopeNamespaces(msgContext.getEnvelope()));
                                                
                                               solicitarCertificadoResponse13 =
                                                   
                                                   
                                                         skel.solicitarCertificado(wrappedParam)
                                                    ;
                                            
                                        envelope = toEnvelope(getSOAPFactory(msgContext), solicitarCertificadoResponse13, false, new javax.xml.namespace.QName("http://www.labora.gva.es/ServicioCertificados/",
                                                    "solicitarCertificado"));
                                    } else 

            if("marcarCertificado".equals(methodName)){
                
                es.gva.labora.www.serviciocertificados.MarcarCertificadoResponse marcarCertificadoResponse15 = null;
	                        es.gva.labora.www.serviciocertificados.MarcarCertificado wrappedParam =
                                                             (es.gva.labora.www.serviciocertificados.MarcarCertificado)fromOM(
                                    msgContext.getEnvelope().getBody().getFirstElement(),
                                    es.gva.labora.www.serviciocertificados.MarcarCertificado.class,
                                    getEnvelopeNamespaces(msgContext.getEnvelope()));
                                                
                                               marcarCertificadoResponse15 =
                                                   
                                                   
                                                         skel.marcarCertificado(wrappedParam)
                                                    ;
                                            
                                        envelope = toEnvelope(getSOAPFactory(msgContext), marcarCertificadoResponse15, false, new javax.xml.namespace.QName("http://www.labora.gva.es/ServicioCertificados/",
                                                    "marcarCertificado"));
                                    } else 

            if("listarCertificados".equals(methodName)){
                
                es.gva.labora.www.serviciocertificados.ListarCertificadosResponse listarCertificadosResponse17 = null;
	                        es.gva.labora.www.serviciocertificados.ListarCertificados wrappedParam =
                                                             (es.gva.labora.www.serviciocertificados.ListarCertificados)fromOM(
                                    msgContext.getEnvelope().getBody().getFirstElement(),
                                    es.gva.labora.www.serviciocertificados.ListarCertificados.class,
                                    getEnvelopeNamespaces(msgContext.getEnvelope()));
                                                
                                               listarCertificadosResponse17 =
                                                   
                                                   
                                                         skel.listarCertificados(wrappedParam)
                                                    ;
                                            
                                        envelope = toEnvelope(getSOAPFactory(msgContext), listarCertificadosResponse17, false, new javax.xml.namespace.QName("http://www.labora.gva.es/ServicioCertificados/",
                                                    "listarCertificados"));
                                    
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
            private  org.apache.axiom.om.OMElement  toOM(es.gva.labora.www.serviciocertificados.SolicitarCertificado param, boolean optimizeContent)
            throws org.apache.axis2.AxisFault {

            
                        try{
                             return param.getOMElement(es.gva.labora.www.serviciocertificados.SolicitarCertificado.MY_QNAME,
                                          org.apache.axiom.om.OMAbstractFactory.getOMFactory());
                        } catch(org.apache.axis2.databinding.ADBException e){
                            throw org.apache.axis2.AxisFault.makeFault(e);
                        }
                    

            }
        
            private  org.apache.axiom.om.OMElement  toOM(es.gva.labora.www.serviciocertificados.SolicitarCertificadoResponse param, boolean optimizeContent)
            throws org.apache.axis2.AxisFault {

            
                        try{
                             return param.getOMElement(es.gva.labora.www.serviciocertificados.SolicitarCertificadoResponse.MY_QNAME,
                                          org.apache.axiom.om.OMAbstractFactory.getOMFactory());
                        } catch(org.apache.axis2.databinding.ADBException e){
                            throw org.apache.axis2.AxisFault.makeFault(e);
                        }
                    

            }
        
            private  org.apache.axiom.om.OMElement  toOM(es.gva.labora.www.serviciocertificados.MarcarCertificado param, boolean optimizeContent)
            throws org.apache.axis2.AxisFault {

            
                        try{
                             return param.getOMElement(es.gva.labora.www.serviciocertificados.MarcarCertificado.MY_QNAME,
                                          org.apache.axiom.om.OMAbstractFactory.getOMFactory());
                        } catch(org.apache.axis2.databinding.ADBException e){
                            throw org.apache.axis2.AxisFault.makeFault(e);
                        }
                    

            }
        
            private  org.apache.axiom.om.OMElement  toOM(es.gva.labora.www.serviciocertificados.MarcarCertificadoResponse param, boolean optimizeContent)
            throws org.apache.axis2.AxisFault {

            
                        try{
                             return param.getOMElement(es.gva.labora.www.serviciocertificados.MarcarCertificadoResponse.MY_QNAME,
                                          org.apache.axiom.om.OMAbstractFactory.getOMFactory());
                        } catch(org.apache.axis2.databinding.ADBException e){
                            throw org.apache.axis2.AxisFault.makeFault(e);
                        }
                    

            }
        
            private  org.apache.axiom.om.OMElement  toOM(es.gva.labora.www.serviciocertificados.ListarCertificados param, boolean optimizeContent)
            throws org.apache.axis2.AxisFault {

            
                        try{
                             return param.getOMElement(es.gva.labora.www.serviciocertificados.ListarCertificados.MY_QNAME,
                                          org.apache.axiom.om.OMAbstractFactory.getOMFactory());
                        } catch(org.apache.axis2.databinding.ADBException e){
                            throw org.apache.axis2.AxisFault.makeFault(e);
                        }
                    

            }
        
            private  org.apache.axiom.om.OMElement  toOM(es.gva.labora.www.serviciocertificados.ListarCertificadosResponse param, boolean optimizeContent)
            throws org.apache.axis2.AxisFault {

            
                        try{
                             return param.getOMElement(es.gva.labora.www.serviciocertificados.ListarCertificadosResponse.MY_QNAME,
                                          org.apache.axiom.om.OMAbstractFactory.getOMFactory());
                        } catch(org.apache.axis2.databinding.ADBException e){
                            throw org.apache.axis2.AxisFault.makeFault(e);
                        }
                    

            }
        
                    private  org.apache.axiom.soap.SOAPEnvelope toEnvelope(org.apache.axiom.soap.SOAPFactory factory, es.gva.labora.www.serviciocertificados.SolicitarCertificadoResponse param, boolean optimizeContent, javax.xml.namespace.QName methodQName)
                        throws org.apache.axis2.AxisFault{
                      try{
                          org.apache.axiom.soap.SOAPEnvelope emptyEnvelope = factory.getDefaultEnvelope();
                           
                                    emptyEnvelope.getBody().addChild(param.getOMElement(es.gva.labora.www.serviciocertificados.SolicitarCertificadoResponse.MY_QNAME,factory));
                                

                         return emptyEnvelope;
                    } catch(org.apache.axis2.databinding.ADBException e){
                        throw org.apache.axis2.AxisFault.makeFault(e);
                    }
                    }
                    
                         private es.gva.labora.www.serviciocertificados.SolicitarCertificadoResponse wrapSolicitarCertificado(){
                                es.gva.labora.www.serviciocertificados.SolicitarCertificadoResponse wrappedElement = new es.gva.labora.www.serviciocertificados.SolicitarCertificadoResponse();
                                return wrappedElement;
                         }
                    
                    private  org.apache.axiom.soap.SOAPEnvelope toEnvelope(org.apache.axiom.soap.SOAPFactory factory, es.gva.labora.www.serviciocertificados.MarcarCertificadoResponse param, boolean optimizeContent, javax.xml.namespace.QName methodQName)
                        throws org.apache.axis2.AxisFault{
                      try{
                          org.apache.axiom.soap.SOAPEnvelope emptyEnvelope = factory.getDefaultEnvelope();
                           
                                    emptyEnvelope.getBody().addChild(param.getOMElement(es.gva.labora.www.serviciocertificados.MarcarCertificadoResponse.MY_QNAME,factory));
                                

                         return emptyEnvelope;
                    } catch(org.apache.axis2.databinding.ADBException e){
                        throw org.apache.axis2.AxisFault.makeFault(e);
                    }
                    }
                    
                         private es.gva.labora.www.serviciocertificados.MarcarCertificadoResponse wrapMarcarCertificado(){
                                es.gva.labora.www.serviciocertificados.MarcarCertificadoResponse wrappedElement = new es.gva.labora.www.serviciocertificados.MarcarCertificadoResponse();
                                return wrappedElement;
                         }
                    
                    private  org.apache.axiom.soap.SOAPEnvelope toEnvelope(org.apache.axiom.soap.SOAPFactory factory, es.gva.labora.www.serviciocertificados.ListarCertificadosResponse param, boolean optimizeContent, javax.xml.namespace.QName methodQName)
                        throws org.apache.axis2.AxisFault{
                      try{
                          org.apache.axiom.soap.SOAPEnvelope emptyEnvelope = factory.getDefaultEnvelope();
                           
                                    emptyEnvelope.getBody().addChild(param.getOMElement(es.gva.labora.www.serviciocertificados.ListarCertificadosResponse.MY_QNAME,factory));
                                

                         return emptyEnvelope;
                    } catch(org.apache.axis2.databinding.ADBException e){
                        throw org.apache.axis2.AxisFault.makeFault(e);
                    }
                    }
                    
                         private es.gva.labora.www.serviciocertificados.ListarCertificadosResponse wrapListarCertificados(){
                                es.gva.labora.www.serviciocertificados.ListarCertificadosResponse wrappedElement = new es.gva.labora.www.serviciocertificados.ListarCertificadosResponse();
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
        
                if (es.gva.labora.www.serviciocertificados.ListarCertificados.class.equals(type)){
                
                        return es.gva.labora.www.serviciocertificados.ListarCertificados.Factory.parse(param.getXMLStreamReaderWithoutCaching());
                    

                }
            
                if (es.gva.labora.www.serviciocertificados.ListarCertificadosResponse.class.equals(type)){
                
                        return es.gva.labora.www.serviciocertificados.ListarCertificadosResponse.Factory.parse(param.getXMLStreamReaderWithoutCaching());
                    

                }
            
                if (es.gva.labora.www.serviciocertificados.MarcarCertificado.class.equals(type)){
                
                        return es.gva.labora.www.serviciocertificados.MarcarCertificado.Factory.parse(param.getXMLStreamReaderWithoutCaching());
                    

                }
            
                if (es.gva.labora.www.serviciocertificados.MarcarCertificadoResponse.class.equals(type)){
                
                        return es.gva.labora.www.serviciocertificados.MarcarCertificadoResponse.Factory.parse(param.getXMLStreamReaderWithoutCaching());
                    

                }
            
                if (es.gva.labora.www.serviciocertificados.SolicitarCertificado.class.equals(type)){
                
                        return es.gva.labora.www.serviciocertificados.SolicitarCertificado.Factory.parse(param.getXMLStreamReaderWithoutCaching());
                    

                }
            
                if (es.gva.labora.www.serviciocertificados.SolicitarCertificadoResponse.class.equals(type)){
                
                        return es.gva.labora.www.serviciocertificados.SolicitarCertificadoResponse.Factory.parse(param.getXMLStreamReaderWithoutCaching());
                    

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
    