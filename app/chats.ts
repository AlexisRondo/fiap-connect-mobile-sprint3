// Lista simples de chats usada pelo app (mock)
export interface ChatItem {
	id: string;
	name: string;
	lastMessage: string;
	lastTime: string;
	avatar: any;
}

export const chats: ChatItem[] = [
	{
		id: "conexao-anjo",
		name: "Conexão Anjo",
		lastMessage: "Te aguardo já",
		lastTime: "11:50",
		avatar: require('../assets/images/ConexãoAnjo.png'),
	},
	{
		id: "gabriel-furlan",
		name: "Gabriel Furlan",
		lastMessage: "blzz! Vou ver o que consigo fazer",
		lastTime: "12:30",
		avatar: require('../assets/images/perfil.png'),
	},
	{
		id: "marco-volpi",
		name: "Marco Volpi",
		lastMessage: "👍",
		lastTime: "11:00",
		avatar: require('../assets/images/perfil.png'),
	},
	{
		id: "matheus-silva",
		name: "Matheus Silva",
		lastMessage: "…",
		lastTime: "09:50",
		avatar: require('../assets/images/perfil.png'),
	},
	{
		id: "cleiton-de-souza",
		name: "Cleiton de Souza",
		lastMessage: "imagina, obg por perguntar",
		lastTime: "11:50",
		avatar: require('../assets/images/perfil.png'),
	},
	{
		id: "via-mobility",
		name: "Via Mobility",
		lastMessage: "📎 Enviou um anexo",
		lastTime: "11:50",
		avatar: require('../assets/images/ViaMobility.jpg'),
	},
];
