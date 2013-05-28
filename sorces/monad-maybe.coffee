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

console.log (add Just1, Just2) # { value: 3 }
console.log (add Nothing, Just2) # {}
console.log (add Just1, Nothing) # {}

(add Just1, Just2) instanceof Maybe # true
(add Just1, Nothing) instanceof Maybe # true

console.log (add (add Just1, Just2), Just2) # { value: 5 }
console.log (add (add Just1, Nothing), Just2) # {}