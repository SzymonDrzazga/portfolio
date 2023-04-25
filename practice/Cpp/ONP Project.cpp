#include <iostream>
#include <vector>
#include <string>
#include <sstream>



std::string replace_to_onp(std::string);
float read_onp(const std::string&);


int main()
{
    //Assigning an equation to a variable
    std::string text = "12+2*(3*4+10/5)";       //12 2 3 4 * 10 5 / + * +
    //text = "2+2*2+2*2";                         //2 2 2 * 2 2 * + +  ||  2 2 2 * + 2 2 * +
    //text = "(2+3)*5";                           //2 3 + 5 *
    //text = "((2+7)/3+(14-3)*4)/2";              //2 7 + 3 / 14 3 - 4 * + 2 / 


    const std::string str = replace_to_onp(text);
    std::cout << str << std::endl;

    float espa = read_onp(str);

    std::cout << espa << std::endl;



    return 0;
}



std::string replace_to_onp(std::string text)
{
    //Creating Output, stock, and str
    std::string output;
    std::vector<std::string> stock;
    std::string str_operator;


    //Iterating through whole text
    for (size_t j = 0; j < text.size(); j++)
    {
        if (text[j] == '−')
        {
            //std::cout << "Jestes zepsuty w znakach mnożenia i odejmowania" << std::endl;
            text[j] = '-';
        }
        if (text[j] == '×')
        {
            //std::cout << "Jestes zepsuty w znakach mnożenia i odejmowania" << std::endl;
            text[j] = '*';
        }

        //operations managing
        if (stock.size() >= 3)
        {
        iterations:
            for (size_t i = 0; i < stock.size(); ++i)
            {
                if (i == (stock.size() - 1))
                {
                    //continue;
                }
                else
                {
                    if (stock[i] == "+" || stock[i] == "-")
                    {
                        if (stock[i + 1] == ")" && stock[i - 1] == "(")
                        {
                            output += (stock[i] + " ");
                            stock.erase(stock.begin() + i);
                            stock.erase(stock.begin() + i);
                            stock.erase(stock.begin() + i - 1);
                            goto iterations;
                        }
                        if (stock[i + 1] == "+" || stock[i + 1] == "-" || stock[i + 1] == ")")
                        {
                            output += (stock[i] + " ");
                            stock.erase(stock.begin() + i);
                            goto iterations;
                        }
                    }

                    else if (stock[i] == "*" || stock[i] == "/")
                    {
                        if (stock[i + 1] == ")" && stock[i - 1] == "(")
                        {
                            output += (stock[i] + " ");
                            stock.erase(stock.begin() + i);
                            stock.erase(stock.begin() + i);
                            stock.erase(stock.begin() + i - 1);
                            goto iterations;
                        }
                        if (stock[i + 1] == "+" || stock[i + 1] == "-" || stock[i + 1] == "*" || stock[i + 1] == "/" || stock[i + 1] == ")")
                        {
                            output += (stock[i] + " ");
                            stock.erase(stock.begin() + i);
                            goto iterations;
                        }
                    }

                    else if (stock[i] == "(" /*|| stock[i] == ")"*/)
                    {
                    }
                    else if (stock[i] == ")")
                    {
                        goto iterations;
                    }
                }

            }
        }

        //Checking if index is a digit
        if (isdigit(text[j]))
        {
            output.push_back(text[j]);
        }

        //adding spaces between numbers
        if (((!isdigit(text[j + 1])) && (!output.empty()) && (output[output.size() - 1] != ' ')))
        {
            output.push_back(' ');
        }


        //Adding operators to the stock
        if (text[j] == '+' || text[j] == '-' || text[j] == '*' || text[j] == '/' || text[j] == '(' || text[j] == ')')
        {
            str_operator += text[j];
            stock.push_back(str_operator);
            str_operator = "";
        }
    }


    //Managing rest of operators
    while (true)
    {
        if (!stock.empty())
        {
            for (size_t i = 0; i < stock.size(); ++i)
            {
                if (stock[i] == "+" || stock[i] == "-")
                {
                    if (i == (stock.size() - 1))
                    {
                        output += (stock[i] + " ");
                        stock.erase(stock.begin() + i);
                        break;
                    }
                    if (stock[i + 1] == ")" && stock[i - 1] == "(")
                    {
                        output += (stock[i] + " ");
                        stock.erase(stock.begin() + i);
                        stock.erase(stock.begin() + i);
                        stock.erase(stock.begin() + i - 1);
                        break;
                    }
                    if (stock[i + 1] == "+" || stock[i + 1] == "-" || stock[i + 1] == ")")
                    {
                        output += (stock[i] + " ");
                        stock.erase(stock.begin() + i);
                        break;
                    }
                }

                else if (stock[i] == "*" || stock[i] == "/")
                {
                    if (i == (stock.size() - 1))
                    {
                        output += (stock[i] + " ");
                        stock.erase(stock.begin() + i);
                        break;
                    }
                    if (stock[i + 1] == ")" && stock[i - 1] == "(")
                    {
                        output += (stock[i] + " ");
                        stock.erase(stock.begin() + i);
                        stock.erase(stock.begin() + i);
                        stock.erase(stock.begin() + i - 1);
                        break;
                    }
                    if (stock[i + 1] == "+" || stock[i + 1] == "-" || stock[i + 1] == "*" || stock[i + 1] == "/" || stock[i + 1] == ")")
                    {
                        output += (stock[i] + " ");
                        stock.erase(stock.begin() + i);
                        break;
                    }
                }

                else if (stock[i] == "(" || stock[i] == ")")
                {
                }
            }
        }
        else
        {
            break;
        }
    }

	return {output};
}

float read_onp(const std::string& str)
{
    std::istringstream text(str);
    std::vector<std::string> vec;
    for (size_t i = 0; i < str.size(); ++i)
    {
        std::string fake;
        text >> fake;
        if (!fake.empty())
        {
			vec.push_back(fake);
        }
    }

    float wynik = 0.0;
    size_t size = vec.size();

    /*for (size_t i = 0; i < size; ++i)
    {
        if (vec[i] == "+" || vec[i] == "-" || vec[i] == "*" || vec[i] == "/")
        {

        	std::string first = vec[i - 2], second = vec[i - 1];

        	if (vec[i] == "+")
            {
                float seba = std::stof(first);
                float seba1 = std::stof(second);
                std::string otp = std::to_string(seba + seba1);
                vec[i].erase();
                vec[i - 1].erase();
                vec[i - 2].erase();
                vec[i] = otp;
            }
            else if (vec[i] == "-")
            {
                float seba = std::stof(first);
                float seba1 = std::stof(second);
                std::string otp = std::to_string(seba - seba1);
                vec[i].erase();
                vec[i - 1].erase();
                vec[i - 2].erase();
                vec[i] = otp;
            }
            else if (vec[i] == "*")
            {
                float seba = std::stof(first);
                float seba1 = std::stof(second);
                std::string otp = std::to_string(seba * seba1);
                vec[i].erase();
                vec[i - 1].erase();
                vec[i - 2].erase();
                vec[i] = otp;
            }
            else if (vec[i] == "/")
            {
                float seba = std::stof(first);
                float seba1 = std::stof(second);
                std::string otp = std::to_string(seba / seba1);
                vec[i].erase();
                vec[i - 1].erase();
                vec[i - 2].erase();
                vec[i] = otp;
            }
        }
    }*/

    for (size_t i = 0; i < size; ++i)
    {
        if (vec[i] == "+" || vec[i] == "-" || vec[i] == "*" || vec[i] == "/")
        {
            std::string first, second;
        	int jeden = 1;
            while (first.empty())
            {
                if (!vec[i - jeden].empty() && first.empty() && second.empty())
                {
                    second = vec[i - jeden];
                }
                if (!vec[i - jeden - 1].empty())
                {
                    first = vec[i - jeden - 1];
                }
                else
                {
            		jeden++;
                }
            }


            if (vec[i] == "+")
            {
                float seba = std::stof(first);
                float seba1 = std::stof(second);
                std::string otp = std::to_string(seba + seba1);
                vec[i].erase();
                vec[i - 1].erase();
                vec[i - jeden - 1].erase();
                vec[i] = otp;
            }
            else if (vec[i] == "-")
            {
                float seba = std::stof(first);
                float seba1 = std::stof(second);
                std::string otp = std::to_string(seba - seba1);
                vec[i].erase();
                vec[i - 1].erase();
                vec[i - jeden - 1].erase();
                vec[i] = otp;
            }
            else if (vec[i] == "*")
            {
                float seba = std::stof(first);
                float seba1 = std::stof(second);
                std::string otp = std::to_string(seba * seba1);
                vec[i].erase();
                vec[i - 1].erase();
                vec[i - jeden - 1].erase();
                vec[i] = otp;
            }
            else if (vec[i] == "/")
            {
                float seba = std::stof(first);
                float seba1 = std::stof(second);
                std::string otp = std::to_string(seba / seba1);
                vec[i].erase();
                vec[i - 1].erase();
                vec[i - jeden - 1].erase();
                vec[i] = otp;
            }
        }

    }




    size = vec.size();

    while (vec[0].empty())
    {
    	vec.erase(vec.begin());
    }


    wynik = stof(vec[0]);


	return wynik;
}
