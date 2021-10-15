Server:                                        m100.cloudmqtt.com
User:                                          buzzwords
Password:                                      **************
Port:                                          19094
SSL Port:                                      29094
Websockets Port (TLS only):      39094
Connection limit:                          5

O medidor está mandando as informações pelo tópico q1/DC4F225F4282/output, sendo o DC4F225F4282 o endereço MAC do ESP.  
No Node-RED, o tópico é assinado como q1/+/output, recebendo os dados de qualquer outro ESP.

A mensagem recebida é um JSON String como este:   
"{"i":"DC4F225F4282","t":"22.94","p":"6.94","o":"180"}"

E na sequência é convertido para JSON Object:   
{"i":"DC4F225F4282","t":"22.94","p":"6.94","o":"180"}

Onde i=ID do device (endereço MAC), t=temperatura, p=pH e o=ORP

https://app.bonsai.io/clusters/elvenio-858026575