

export function CalculateDomains(numberOfGraphs: number){
    switch (numberOfGraphs){
        case 1:
            return [0,1]
        case 2:
            return [[0.55, 1], [0, 0.45]]
        case 3:
            return [[0.70, 1], [0.36, 0.66], [0.02, 0.32]]
        case 4:
            return [[0.78, 1], [0.53, 0.75], [0.28, 0.5], [0.03, 0.25]]
        default:
            return [0,1]
    }
}