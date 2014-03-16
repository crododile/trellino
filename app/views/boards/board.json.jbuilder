json.(@board, :id, :title)

json.lists @board.lists, :id, :title, :rank, :board_id, :cards

json.members @board.members, :id, :email


