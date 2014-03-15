json.(@board, :id, :title)

json.lists @board.lists, :title, :rank, :board_id
