## List
Array.prototype.bind = (f) -> # суффиксная "бинарная" форма
  Array.prototype.concat.apply [], this.map f

returnArray = (x) -> # префиксная "унарная" форма
  [x]

g = (x) -> [-x, x]
f = (x) -> [x, x+1, x+2]
[1..3].bind f # [ 1, 2, 3, 2, 3, 4, 3, 4, 5 ]

# x >== return === x
[1..3].bind returnArray # [1, 2, 3]

# (return x >>= f) = f x
elemsX2 = (arr) ->
  arr.map (a) -> a * 2
filterElemsLET3 = (arr) ->
  arr.filter (a) -> a > 3

(returnArray [1,2,3]).bind elemsX2 # [2, 4, 6]
elemsX2 [1,2,3] # [2,4,6]

## ((x >>= f) >>= g) = (x >>= (\y -> f y >>= g))
([1..3].bind f).bind g # [ -1, 1, -2, 2, -3, 3, -2, 2, -3, 3, -4, 4, -3, 3, -4, 4, -5, 5 ]
[1..3].bind (y) -> (f y).bind g # [ -1, 1, -2, 2, -3, 3, -2, 2, -3, 3, -4, 4, -3, 3, -4, 4, -5, 5 ]


## Maybe
Maybe = (value) ->
  @value = value if value

Nothing = new Maybe()

Maybe.prototype.bind = (f) ->
  if @value
    f @value
  else
    Nothing

Just1 = new Maybe(1); # new Maybe(1) instanceof Maybe
Just2 = new Maybe(2);

add = (mx, my) ->
  mx.bind (x) ->
    my.bind (y) ->
      new Maybe(x + y)

add Just1, Just2 # { value: 3 }
add Nothing, Just2 # {}
add Just1, Nothing # {}
(add Just1, Just2) instanceof Maybe # true
(add Just1, Nothing) instanceof Maybe # true



