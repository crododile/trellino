json.(@board, :id, :title, :rank, :board_id)

json.cards @board.cards, :id, :title, :description, :rank
