json.(@board, :id, :title)

json.members @board.members, :id, :email

json.lists @board.lists, :id, :title, :rank, :board_id

json.cards @board.cards, :id, :title, :description, :rank
