Um jogador nunca deve saber a posição dos navios do oponente.
Depois que todas as peças estão posicionadas, os jogadores se alternam em turnos para lançar bombas
sobre o outro oponente especificando qual posição ele deseja atacar. Se algum dos navios do jogador
que está sendo atacado estiver na posição atacada, considera-se que o navio foi atingido. O ataque falha
se o atacante lançar uma bomba em um local onde não existe nenhum navio do oponente.
Caso todos as posições de um navio for atingida, o jogador atacado deve informar o oponente qual dos
seus navios afundou. O jogo continua até que um jogador afunde todos os navios de seu oponente; este
jogador é então considerado vencedor.
Você deve desenvolver um programa que jogue uma partida de batalha naval entre dois oponentes.
Você precisa:
Definir uma maneira de indicar o estado inicial dos navios dos jogadores;
Exibir todos os movimentos dos jogadores, informando se os ataques foram bem sucedidos ou não;
Informar quando um navio é atingido e quando ele é afundado;
Exibir ao final do jogo um mapa final do posicionamento final dos navios dos jogadores.

Requisitos
Considere a criação de uma arquivo readme.md para descrever como implantar e executar a aplicação.
Considere utilizar boas práticas de desenvolvimento de software como TDD
Fazer deploy e colocar as URL's no README
Colocar o código no GITHUB e nos mandar a URL

Itens a serem avaliados:
Implementações de Teste
Organização das resposabilidades
Estrutura do Código
Código Limpo

jest

- salva sockets num objeto interno, precisa deletar quando um socket encerra
- socket encerra: se tiver outro jogador, informa ele de vitória
-                 se tiver uma sala, encerra a sala
