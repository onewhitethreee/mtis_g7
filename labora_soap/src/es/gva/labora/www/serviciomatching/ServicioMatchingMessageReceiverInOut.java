
/**
 * ServicioMatchingMessageReceiverInOut.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis2 version: 1.6.3  Built on : Jun 27, 2015 (11:17:49 BST)
 */
        package es.gva.labora.www.serviciomatching;

        /**
        *  ServicioMatchingMessageReceiverInOut message receiver
        */

        public class ServicioMatchingMessageReceiverInOut extends org.apache.axis2.receivers.AbstractInOutMessageReceiver{


        public void invokeBusinessLogic(org.apache.axis2.context.MessageContext msgContext, org.apache.axis2.context.MessageContext newMsgContext)
        throws org.apache.axis2.AxisFault{

        try {

        // get the implementation class for the Web Service
        Object obj = getTheImplementationObject(msgContext);

        ServicioMatchingSkeleton skel = (ServicioMatchingSkeleton)obj;
        //Out Envelop
        org.apache.axiom.soap.SOAPEnvelope envelope = null;
        //Find the axisOperation that has been set by the Dispatch phase.
        org.apache.axis2.description.AxisOperation op = msgContext.getOperationContext().getAxisOperation();
        if (op == null) {
        throw new org.apache.axis2.AxisFault("Operation is not located, if this is doclit style the SOAP-ACTION should specified via the SOAP Action to use the RawXMLProvider");
        }

        java.lang.String methodName;
        if((op.getName() != null) && ((methodName = org.apache.axis2.util.JavaUtils.xmlNameToJavaIdentifier(op.getName().getLocalPart())) != null)){


        

            if("obtenerCandidatos".equals(methodName)){
                
                es.gva.labora.www.serviciomatching.ObtenerCandidatosResponse obtenerCandidatosResponse9 = null;
	                        es.gva.labora.www.serviciomatching.ObtenerCandidatos wrappedParam =
                                                             (es.gva.labora.www.serviciomatching.ObtenerCandidatos)fromOM(
                                    msgContext.getEnvelope().getBody().getFirstElement(),
                                    es.gva.labora.www.serviciomatching.ObtenerCandidatos.class,
                                    getEnvelopeNamespaces(msgContext.getEnvelope()));
                                                
                                               obtenerCandidatosResponse9 =
                                                   
                                                   
                                                         skel.obtenerCandidatos(wrappedParam)
                                                    ;
                                            
                                        envelope = toEnvelope(getSOAPFactory(msgContext), obtenerCandidatosResponse9, false, new javax.xml.namespace.QName("http://www.labora.gva.es/ServicioMatching/",
                                                    "obtenerCandidatos"));
                                    } else 

            if("ejecutarMatching".equals(methodName)){
                
                es.gva.labora.www.serviciomatching.EjecutarMatchingResponse ejecutarMatchingResponse11 = null;
	                        es.gva.labora.www.serviciomatching.EjecutarMatching wrappedParam =
                                                             (es.gva.labora.www.serviciomatching.EjecutarMatching)fromOM(
                                    msgContext.getEnvelope().getBody().getFirstElement(),
                                    es.gva.labora.www.serviciomatching.EjecutarMatching.class,
                                    getEnvelopeNamespaces(msgContext.getEnvelope()));
                                                
                                               ejecutarMatchingResponse11 =
                                                   
                                                   
                                                         skel.ejecutarMatching(wrappedParam)
                                                    ;
                                            
                                        envelope = toEnvelope(getSOAPFactory(msgContext), ejecutarMatchingResponse11, false, new javax.xml.namespace.QName("http://www.labora.gva.es/ServicioMatching/",
                                                    "ejecutarMatching"));
                                    
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
            private  org.apache.axiom.om.OMElement  toOM(es.gva.labora.www.serviciomatching.ObtenerCandidatos param, boolean optimizeContent)
            throws org.apache.axis2.AxisFault {

            
                        try{
                             return param.getOMElement(es.gva.labora.www.serviciomatching.ObtenerCandidatos.MY_QNAME,
                                          org.apache.axiom.om.OMAbstractFactory.getOMFactory());
                        } catch(org.apache.axis2.databinding.ADBException e){
                            throw org.apache.axis2.AxisFault.makeFault(e);
                        }
                    

            }
        
            private  org.apache.axiom.om.OMElement  toOM(es.gva.labora.www.serviciomatching.ObtenerCandidatosResponse param, boolean optimizeContent)
            throws org.apache.axis2.AxisFault {

            
                        try{
                             return param.getOMElement(es.gva.labora.www.serviciomatching.ObtenerCandidatosResponse.MY_QNAME,
                                          org.apache.axiom.om.OMAbstractFactory.getOMFactory());
                        } catch(org.apache.axis2.databinding.ADBException e){
                            throw org.apache.axis2.AxisFault.makeFault(e);
                        }
                    

            }
        
            private  org.apache.axiom.om.OMElement  toOM(es.gva.labora.www.serviciomatching.EjecutarMatching param, boolean optimizeContent)
            throws org.apache.axis2.AxisFault {

            
                        try{
                             return param.getOMElement(es.gva.labora.www.serviciomatching.EjecutarMatching.MY_QNAME,
                                          org.apache.axiom.om.OMAbstractFactory.getOMFactory());
                        } catch(org.apache.axis2.databinding.ADBException e){
                            throw org.apache.axis2.AxisFault.makeFault(e);
                        }
                    

            }
        
            private  org.apache.axiom.om.OMElement  toOM(es.gva.labora.www.serviciomatching.EjecutarMatchingResponse param, boolean optimizeContent)
            throws org.apache.axis2.AxisFault {

            
                        try{
                             return param.getOMElement(es.gva.labora.www.serviciomatching.EjecutarMatchingResponse.MY_QNAME,
                                          org.apache.axiom.om.OMAbstractFactory.getOMFactory());
                        } catch(org.apache.axis2.databinding.ADBException e){
                            throw org.apache.axis2.AxisFault.makeFault(e);
                        }
                    

            }
        
                    private  org.apache.axiom.soap.SOAPEnvelope toEnvelope(org.apache.axiom.soap.SOAPFactory factory, es.gva.labora.www.serviciomatching.ObtenerCandidatosResponse param, boolean optimizeContent, javax.xml.namespace.QName methodQName)
                        throws org.apache.axis2.AxisFault{
                      try{
                          org.apache.axiom.soap.SOAPEnvelope emptyEnvelope = factory.getDefaultEnvelope();
                           
                                    emptyEnvelope.getBody().addChild(param.getOMElement(es.gva.labora.www.serviciomatching.ObtenerCandidatosResponse.MY_QNAME,factory));
                                

                         return emptyEnvelope;
                    } catch(org.apache.axis2.databinding.ADBException e){
                        throw org.apache.axis2.AxisFault.makeFault(e);
                    }
                    }
                    
                         private es.gva.labora.www.serviciomatching.ObtenerCandidatosResponse wrapObtenerCandidatos(){
                                es.gva.labora.www.serviciomatching.ObtenerCandidatosResponse wrappedElement = new es.gva.labora.www.serviciomatching.ObtenerCandidatosResponse();
                                return wrappedElement;
                         }
                    
                    private  org.apache.axiom.soap.SOAPEnvelope toEnvelope(org.apache.axiom.soap.SOAPFactory factory, es.gva.labora.www.serviciomatching.EjecutarMatchingResponse param, boolean optimizeContent, javax.xml.namespace.QName methodQName)
                        throws org.apache.axis2.AxisFault{
                      try{
                          org.apache.axiom.soap.SOAPEnvelope emptyEnvelope = factory.getDefaultEnvelope();
                           
                                    emptyEnvelope.getBody().addChild(param.getOMElement(es.gva.labora.www.serviciomatching.EjecutarMatchingResponse.MY_QNAME,factory));
                                

                         return emptyEnvelope;
                    } catch(org.apache.axis2.databinding.ADBException e){
                        throw org.apache.axis2.AxisFault.makeFault(e);
                    }
                    }
                    
                         private es.gva.labora.www.serviciomatching.EjecutarMatchingResponse wrapEjecutarMatching(){
                                es.gva.labora.www.serviciomatching.EjecutarMatchingResponse wrappedElement = new es.gva.labora.www.serviciomatching.EjecutarMatchingResponse();
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
        
                if (es.gva.labora.www.serviciomatching.EjecutarMatching.class.equals(type)){
                
                        return es.gva.labora.www.serviciomatching.EjecutarMatching.Factory.parse(param.getXMLStreamReaderWithoutCaching());
                    

                }
            
                if (es.gva.labora.www.serviciomatching.EjecutarMatchingResponse.class.equals(type)){
                
                        return es.gva.labora.www.serviciomatching.EjecutarMatchingResponse.Factory.parse(param.getXMLStreamReaderWithoutCaching());
                    

                }
            
                if (es.gva.labora.www.serviciomatching.ObtenerCandidatos.class.equals(type)){
                
                        return es.gva.labora.www.serviciomatching.ObtenerCandidatos.Factory.parse(param.getXMLStreamReaderWithoutCaching());
                    

                }
            
                if (es.gva.labora.www.serviciomatching.ObtenerCandidatosResponse.class.equals(type)){
                
                        return es.gva.labora.www.serviciomatching.ObtenerCandidatosResponse.Factory.parse(param.getXMLStreamReaderWithoutCaching());
                    

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
    