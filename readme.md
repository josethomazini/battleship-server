Se algum dos navios do jogador que está sendo atacado estiver na posição atacada, considera-se que o navio foi atingido.

O ataque falha se o atacante lançar uma bomba em um local onde não existe nenhum navio do oponente.

Caso todos as posições de um navio forem atingidas, o jogador atacado deve informar o oponente qual dos seus navios afundou.

O jogo continua até que um jogador afunde todos os navios de seu oponente; este jogador é então considerado vencedor.

Exibir todos os movimentos dos jogadores, informando se os ataques foram bem sucedidos ou não;

Informar quando um navio é atingido e quando ele é afundado;

Exibir ao final do jogo um mapa final do posicionamento final dos navios dos jogadores.

jest

- salva sockets num objeto interno, precisa deletar quando um socket encerra
- socket encerra: se tiver outro jogador, informa ele de vitória
-                 se tiver uma sala, encerra a sala
