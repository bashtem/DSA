export interface Node<T>{
    data: T;
    children: T[]
}

function levelWidth<T>(root: Node<T>) {
    let counter = 0
    let arrRes = []
    let marker = "S";
    let arr = [root, marker]
    
    while(arr.length){
        let node = arr.shift()
        
        if(node === marker){
            arrRes.push(counter)
            if(arr.length === 0) break;
            
            counter = 0
            arr.push(marker)
            continue;
        }
        counter++
        arr.push(...node.children)

    }
    
    return arrRes;
}